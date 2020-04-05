/**
 * Model Interface of Grid Stack Item and Clone to Default
 * @export
 * @class GridStackItem
 */
export class GridStackItem {
    x = 0;
    y = 0;
    height = 1;
    width = 1;
    maxHeight?: number;
    minHeight?: number;
    maxWidth?: number;
    minWidth?: number;
    noResize = true;
    noMove = true;
    autoPosition = true;
    marginWidth = '2.5px';
    locked?: boolean;
    el?: any;
    customId?: string;
    backgroundColor?: string;
    foregroundColor?: string;
    visible: boolean = true;
    title?: any;
    key?: any
    static Clone(widget: GridStackItem) {
        const result = new GridStackItem();
        result.autoPosition = widget.autoPosition;
        result.customId = widget.customId;
        result.el = widget.el;
        result.height = widget.height;
        result.locked = widget.locked;
        result.maxHeight = widget.maxHeight;
        result.maxWidth = widget.maxWidth;
        result.minHeight = widget.minHeight;
        result.minWidth = widget.minWidth;
        result.noMove = widget.noMove;
        result.noResize = widget.noResize;
        result.width = widget.width;
        result.x = widget.x;
        result.y = widget.y;
        return result;
    }
}
