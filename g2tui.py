from textual.app import App, ComposeResult
from textual.widgets import Footer, Header, Select, Label, Button, ListView, ListItem
from textual.containers import Vertical, Horizontal
from textual import work
from textual.events import Key

from routes_bank import get_bank, select_bank_item
from routes_etc import select_variation, play_note, remove_note
from routes_patch import get_slot_info, Module
from routes_parameters import set_parameter
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


class G2TUI(App):
    """G2 Terminal Application Editor"""

    BINDINGS = [
        ("left", "adjust_param(-1)", "Decrease param"),
        ("right", "adjust_param(1)", "Increase param"),
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

    def action_toggle_dark(self) -> None:
        """An action to toggle dark mode."""
        self.theme = (
            "textual-dark" if self.theme == "textual-light" else "textual-light"
        )


if __name__ == "__main__":
    app = G2TUI()
    app.run()
