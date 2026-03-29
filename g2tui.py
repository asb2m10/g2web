from textual.app import App, ComposeResult
from textual.widgets import Footer, Header, Select, Label, Button, ListView, ListItem, Input
from textual.containers import Vertical, Horizontal
from textual import work
from textual.events import Key
from textual.screen import ModalScreen

from routes_bank import get_bank, select_bank_item, save_bank_item
from routes_etc import select_variation, play_note, remove_note
from routes_patch import get_slot_info, Module
from routes_parameters import set_parameter, set_parametercc, delete_parametercc
from g2ools.nord.g2.modules import idmap as module_idmap

# Computer keyboard piano: a s d f g h j  →  C D E F G A B  (middle octave)
NOTE_KEYS = {
    'a': 60, 's': 62, 'd': 64, 'f': 65,
    'g': 67, 'h': 69, 'j': 71,
}


def param_display(param_def, raw: int) -> str:
    if param_def is None or not param_def.map:
        return str(raw)
    for display, val_str in param_def.map[0].items():
        try:
            if int(val_str) == raw:
                return display.replace('_', ' ')
        except ValueError:
            pass
    return str(raw)


class ModuleItem(ListItem):
    def __init__(self, module: Module) -> None:
        super().__init__()
        self.module = module

    def compose(self) -> ComposeResult:
        yield Label(self.module.name)


class ParamItem(ListItem):
    def __init__(self, module: Module, param_idx: int, param_def) -> None:
        super().__init__()
        self.module = module
        self.param_idx = param_idx
        self.param_def = param_def

    def compose(self) -> ComposeResult:
        yield Label("", id="param-label")

    def update_label(self, variation: int) -> None:
        raw = self.module.parameters[self.param_idx].values[variation - 1]
        display = param_display(self.param_def, raw)
        name = self.module.parameters[self.param_idx].name
        self.query_one("#param-label", Label).update(f"{name}: {display}")


class SaveBankDialog(ModalScreen[tuple[int, int] | None]):
    """Dialog to choose bank and patch destination for saving."""

    BINDINGS = [("escape", "dismiss(None)", "Cancel")]

    def __init__(self, bank: int, patch: int) -> None:
        super().__init__()
        self._bank = bank
        self._patch = patch

    def compose(self) -> ComposeResult:
        with Vertical(id="cc-dialog"):
            yield Label("Save to bank destination")
            with Horizontal():
                yield Label("Bank (1-32): ", classes="save-label")
                yield Input(str(self._bank), id="save-bank", type="integer")
            with Horizontal():
                yield Label("Patch (1-127): ", classes="save-label")
                yield Input(str(self._patch), id="save-patch", type="integer")
            with Horizontal(id="cc-buttons"):
                yield Button("Save", id="save-confirm", variant="primary")
                yield Button("Cancel", id="save-cancel")

    def on_button_pressed(self, event: Button.Pressed) -> None:
        if event.button.id == "save-cancel":
            self.dismiss(None)
        elif event.button.id == "save-confirm":
            self._submit()

    def on_input_submitted(self, event: Input.Submitted) -> None:
        self._submit()

    def _submit(self) -> None:
        try:
            bank = int(self.query_one("#save-bank", Input).value)
            patch = int(self.query_one("#save-patch", Input).value)
        except ValueError:
            return
        bank_ok = 1 <= bank <= 32
        patch_ok = 1 <= patch <= 127
        self.query_one("#save-bank", Input).set_class(not bank_ok, "error")
        self.query_one("#save-patch", Input).set_class(not patch_ok, "error")
        if bank_ok and patch_ok:
            self.dismiss((bank, patch))


class MidiCCDialog(ModalScreen[int | str | None]):
    """Dialog to assign or unassign a MIDI CC number to a parameter."""

    BINDINGS = [("escape", "dismiss(None)", "Cancel")]

    def __init__(self, param_name: str) -> None:
        super().__init__()
        self._param_name = param_name

    def compose(self) -> ComposeResult:
        with Vertical(id="cc-dialog"):
            yield Label(f"Assign MIDI CC to: {self._param_name}")
            yield Input(placeholder="CC number (0-127)", id="cc-input", type="integer")
            with Horizontal(id="cc-buttons"):
                yield Button("Assign", id="cc-assign", variant="primary")
                yield Button("Unassign", id="cc-unassign", variant="warning")
                yield Button("Cancel", id="cc-cancel")

    def on_button_pressed(self, event: Button.Pressed) -> None:
        if event.button.id == "cc-cancel":
            self.dismiss(None)
        elif event.button.id == "cc-unassign":
            self.dismiss("unassign")
        elif event.button.id == "cc-assign":
            self._submit()

    def on_input_submitted(self, event: Input.Submitted) -> None:
        self._submit()

    def _submit(self) -> None:
        value = self.query_one("#cc-input", Input).value.strip()
        try:
            cc = int(value)
            if 0 <= cc <= 127:
                self.dismiss(cc)
            else:
                self.query_one("#cc-input", Input).add_class("error")
        except ValueError:
            self.query_one("#cc-input", Input).add_class("error")


class G2TUI(App):
    """G2 Terminal Application Editor"""

    CSS = """
    MidiCCDialog {
        align: center middle;
    }
    #cc-dialog {
        padding: 1 2;
        width: 70;
        height: auto;
        border: thick $primary;
        background: $surface;
    }
    #cc-buttons {
        height: auto;
        margin-top: 1;
        align: right middle;
    }
    #cc-buttons Button {
        margin-left: 1;
    }
    .save-label {
        width: 16;
        content-align: right middle;
        padding-top: 1;
    }
    """

    BINDINGS = [
        ("left", "adjust_param(-1)", "Decrease param"),
        ("right", "adjust_param(1)", "Increase param"),
        ("s", "save_bank", "Save bank"),
        ("q", "quit", "Quit"),
    ]

    def compose(self) -> ComposeResult:
        yield Header()
        with Vertical(id="top-bar"):
            #yield Label("Bank:")
            yield Select([], id="bank_select", prompt="Loading banks...", compact=True)
            #yield Label("Variation:")
            yield Horizontal(
                *[Button(str(i), id=f"var-{i}", compact=True) for i in range(1, 9)],
            )
        with Horizontal(id="main-content"):
            yield ListView(id="module-list")
            yield ListView(id="param-list")
        yield Footer()

    def on_mount(self) -> None:
        self.current_variation = 1
        self._active_notes: set[int] = set()
        self.query_one("#top-bar").styles.height = "auto"
        self.query_one("#top-bar Horizontal").styles.height = "auto"
        self.query_one("#main-content").styles.height = "1fr"
        self.load_banks()
        self.load_slot()

    @work
    async def on_key(self, event: Key) -> None:
        note = NOTE_KEYS.get(event.character)
        if note is None or note in self._active_notes:
            return
        event.stop()
        self._active_notes.add(note)
        try:
            await play_note(note)
        except Exception as e:
            self.notify(f"Note error: {e}", severity="error")
            self._active_notes.discard(note)
            return
        self.set_timer(0.3, lambda: self._release_note(note))

    @work
    async def _release_note(self, note: int) -> None:
        self._active_notes.discard(note)
        try:
            await remove_note(note)
        except Exception as e:
            self.notify(f"Note off error: {e}", severity="error")

    @work(exclusive=True)
    async def load_banks(self) -> None:
        try:
            banks = await get_bank()
        except Exception as e:
            self.query_one("#bank_select", Select).set_options([])
            self.notify(f"Failed to load banks: {e}", severity="error")
            return

        options = [(f"[{b.type.upper()}] {b.bank}:{b.patch:03d} {b.name}", b.id) for b in banks]
        select = self.query_one("#bank_select", Select)
        select.set_options(options)
        select.prompt = "Select a bank patch..."

    @work(exclusive=True)
    async def load_slot(self, slot: str = "a") -> None:
        try:
            patch = await get_slot_info(slot)
        except Exception as e:
            self.notify(f"Failed to load slot: {e}", severity="error")
            return

        module_list = self.query_one("#module-list", ListView)
        module_list.clear()
        for module in patch.modules:
            module_list.append(ModuleItem(module))

    def on_select_changed(self, event: Select.Changed) -> None:
        if event.value is not Select.BLANK:
            self._load_bank_item(event.value)

    @work
    async def _load_bank_item(self, bank_id: str) -> None:
        type_, bank, patch = bank_id.split(":")
        try:
            await select_bank_item("a", int(bank), int(patch))
            patch_info = await get_slot_info("a")
        except Exception as e:
            self.notify(f"Error: {e}", severity="error")
            return

        self.current_variation = 1
        module_list = self.query_one("#module-list", ListView)
        module_list.clear()
        for module in patch_info.modules:
            module_list.append(ModuleItem(module))

    def _refresh_params(self, module: Module) -> None:
        param_list = self.query_one("#param-list", ListView)
        param_list.clear()
        module_def = module_idmap.get(module.type)
        for idx, param in enumerate(module.parameters):
            param_def = module_def.params[idx].type if module_def and idx < len(module_def.params) else None
            item = ParamItem(module, idx, param_def)
            param_list.append(item)
            item.update_label(self.current_variation)

    def on_list_view_selected(self, event: ListView.Selected) -> None:
        if event.list_view.id == "module-list" and isinstance(event.item, ModuleItem):
            self._refresh_params(event.item.module)
        elif event.list_view.id == "param-list" and isinstance(event.item, ParamItem):
            self._open_assign_cc(event.item)

    @work
    async def on_button_pressed(self, event: Button.Pressed) -> None:
        if event.button.id and event.button.id.startswith("var-"):
            variation = int(event.button.id.split("-")[1])
            try:
                await select_variation(variation)
                self.current_variation = variation
                self.notify(f"Variation {variation}")
            except Exception as e:
                self.notify(f"Error: {e}", severity="error")
                return

            param_list = self.query_one("#param-list", ListView)
            for item in param_list.query(ParamItem):
                item.update_label(self.current_variation)

    @work
    async def action_adjust_param(self, delta: int) -> None:
        param_list = self.query_one("#param-list", ListView)
        if not param_list.has_focus:
            return
        item = param_list.highlighted_child
        if not isinstance(item, ParamItem):
            return

        param = item.module.parameters[item.param_idx]
        raw = param.values[self.current_variation - 1]

        low = item.param_def.low if item.param_def else 0
        high = item.param_def.high if item.param_def else 127
        new_value = max(low, min(high, raw + delta))
        if new_value == raw:
            return

        try:
            await set_parameter("a", "VA", item.module.instance, item.param_idx, new_value, self.current_variation)
        except Exception as e:
            self.notify(f"Error: {e}", severity="error")
            return

        param.values[self.current_variation - 1] = new_value
        item.update_label(self.current_variation)

    @work
    async def _open_assign_cc(self, item: ParamItem) -> None:
        param_name = item.module.parameters[item.param_idx].name
        result = await self.app.push_screen_wait(MidiCCDialog(param_name))
        if result is None:
            return

        try:
            if result == "unassign":
                await delete_parametercc("a", item.module.instance)
                self.notify(f"CC unassigned from {param_name}")
            else:
                await set_parametercc("a", "VA", item.module.instance, item.param_idx, result)
                self.notify(f"CC {result} assigned to {param_name}")
        except Exception as e:
            self.notify(f"Error: {e}", severity="error")

    @work
    async def action_save_bank(self) -> None:
        select = self.query_one("#bank_select", Select)
        value = select.value
        if isinstance(value, str) and ":" in value:
            _, bank_str, patch_str = value.split(":")
            default_bank, default_patch = int(bank_str), int(patch_str)
        else:
            default_bank, default_patch = 1, 1

        result = await self.app.push_screen_wait(SaveBankDialog(default_bank, default_patch))
        if result is None:
            return

        bank, patch = result
        try:
            await save_bank_item("a", bank, patch)
            self.notify(f"Saved to bank {bank} patch {patch}")
        except Exception as e:
            self.notify(f"Save error: {e}", severity="error")

    def action_toggle_dark(self) -> None:
        """An action to toggle dark mode."""
        self.theme = (
            "textual-dark" if self.theme == "textual-light" else "textual-light"
        )


if __name__ == "__main__":
    app = G2TUI()
    app.run()
