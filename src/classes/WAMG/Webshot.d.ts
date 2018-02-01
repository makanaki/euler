/// <reference types="node" />
export declare class WAMG_Webshot {
    static url: string;
    static getImgBody(url: string, canvasWidth?: number, canvasHeight?: number, resizeWidth?: number, resizeHeight?: number, delay?: number, type?: string): Promise<Buffer>;
}
export declare class WAMG_Webshot1 {
    static url: string;
    /**
     * @param url - URL to any web page
     * @param canvasWidth - width of source shot
     * @param canvasHeight - height of source shot
     * @param canvasOffsetX - X offset of shot from left in pixels
     * @param canvasOffsetY - Y offset of shot from top in pixels
     * @param resizeWidth - width of result image
     * @param resizeHeight - height of result image
     * @param delay - onLoad-like delay for webshot server
     *
     * @return String - image content
     */
    static getImgBody(url: string, canvasWidth: number, canvasHeight: number, canvasOffsetX: number, canvasOffsetY: number, resizeWidth: number, resizeHeight: number, delay?: number): Promise<Buffer>;
}
