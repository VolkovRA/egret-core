//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

/// <reference path="../../events/IOErrorEvent.ts" />
/// <reference path="../../events/EventDispatcher.ts" />

namespace egret.web
{
    /**
     * @private
     */
    export class WebHttpRequest extends EventDispatcher implements HttpRequest
    {
        /**
         * @private
         */
        public constructor() {
            super();
        }

        /**
         * @private
         */
        private _xhr: XMLHttpRequest;

        /**
         * 
         */
        public timeout: number = 0;

        /**
         * @private
         * The data returned by this request is determined by the value set in responseType.
         */
        public get response(): any {
            if (!this._xhr) {
                return null;
            }

            if (this._xhr.response != undefined) {
                return this._xhr.response;
            }

            if (this._responseType == "text") {
                return this._xhr.responseText;
            }

            if (this._responseType == "arraybuffer" && /msie 9.0/i.test(navigator.userAgent)) {
                let w: any = window;
                return w.convertResponseBodyToText(this._xhr["responseBody"]);
            }

            if (this._responseType == "document") {
                return this._xhr.responseXML;
            }

            /*if (this._xhr.responseXML) {
                return this._xhr.responseXML;
            }
            if (this._xhr.responseText != undefined) {
                return this._xhr.responseText;
            }*/
            return null;
        }

        /**
         * @private
         */
        private _responseType: "" | "arraybuffer" | "blob" | "document" | "json" | "text";

        /**
         * @private
         * To set the returned data format, please use the enumeration value defined in HttpResponseType.
         * Setting an illegal value or not setting will use HttpResponseType.TEXT.
         */
        public get responseType(): "" | "arraybuffer" | "blob" | "document" | "json" | "text" {
            return this._responseType;
        }

        public set responseType(value: "" | "arraybuffer" | "blob" | "document" | "json" | "text") {
            this._responseType = value;
        }

        /**
         * @private
         */
        private _withCredentials: boolean;

        /**
         * @private
         * Indicates whether to use authentication information (such as cookies or authorized headers) when making cross-site access control (Access-Control) requests.
         * The default is false. (This flag will not affect requests from the same site)
         */
        public get withCredentials(): boolean {
            return this._withCredentials;
        }

        public set withCredentials(value: boolean) {
            this._withCredentials = value;
        }

        /**
         * @private
         */
        private _url: string = "";
        private _method: string = "";

        /**
         * @private
         * @returns
         */
        private getXHR(): any {
            if (window["XMLHttpRequest"]) {
                return new window["XMLHttpRequest"]();
            } else {
                return new ActiveXObject("MSXML2.XMLHTTP");
            }
        }

        /**
         * @private
         * Initialize a request. Note that calling this method on an object that has already made a request is equivalent to calling abort () immediately.
         * @param url URL to be accessed by the request URL to be accessed by the request.
         * @param method The HTTP method used for the request, please use the enumeration value defined by HttpMethod.
         */
        public open(url: string, method: string = "GET"): void {
            this._url = url;
            this._method = method;
            if (this._xhr) {
                this._xhr.abort();
                this._xhr = null;
            }
            let xhr = this.getXHR(); // new XMLHttpRequest();
            if (window["XMLHttpRequest"]) {
                xhr.addEventListener("load", this.onload.bind(this));
                xhr.addEventListener("error", this.onerror.bind(this));
            } else {
                xhr.onreadystatechange = this.onReadyStateChange.bind(this);
            }
            xhr.onprogress = this.updateProgress.bind(this);
            xhr.ontimeout = this.onTimeout.bind(this)
            xhr.open(this._method, this._url, true);
            this._xhr = xhr;
        }

        /**
         * @private
         * Send request.
         * @param data Data to be sent.
         */
        public send(data?: any): void {
            if (this._responseType != null) {
                this._xhr.responseType = this._responseType;
            }
            if (this._withCredentials != null) {
                this._xhr.withCredentials = this._withCredentials;
            }
            if (this.headerObj) {
                for (let key in this.headerObj) {
                    this._xhr.setRequestHeader(key, this.headerObj[key]);
                }
            }
            this._xhr.timeout = this.timeout;
            this._xhr.send(data);
        }

        /**
         * @private
         * If the request has been sent, the request is aborted immediately.
         */
        public abort(): void {
            if (this._xhr) {
                this._xhr.abort();
            }
        }

        /**
         * @private
         * Return all response header information (response header name and value), if the response header has not been accepted, then return "".
         */
        public getAllResponseHeaders(): string {
            if (!this._xhr) {
                return null;
            }
            let result = this._xhr.getAllResponseHeaders();
            return result ? result : "";
        }

        private headerObj: any;

        /**
         * @private
         * Assign a value to the specified HTTP request header. Before that, you must confirm that a url has been opened by calling the open () method.
         * @param header The name of the request header to be assigned.
         * @param value The value assigned to the specified request header.
         */
        public setRequestHeader(header: string, value: string): void {
            if (!this.headerObj) {
                this.headerObj = {};
            }
            this.headerObj[header] = value;
        }

        /**
         * @private
         * Returns the value of the specified response header, if the response header has not been accepted, or the response header does not exist, it returns "".
         * @param header The name of the response header to be returned.
         */
        public getResponseHeader(header: string): string {
            if (!this._xhr) {
                return null;
            }
            let result = this._xhr.getResponseHeader(header);
            return result ? result : "";
        }

        /**
         * @private
         */
        private onTimeout(): void {
            this.dispatchEventWith(IOErrorEvent.IO_ERROR);
        }

        /**
         * @private
         */
        private onReadyStateChange(): void {
            let xhr = this._xhr;
            if (xhr.readyState == 4) {// 4 = "loaded"
                let ioError = (xhr.status >= 400 || xhr.status == 0);
                let url = this._url;
                let self = this;
                window.setTimeout(function (): void {
                    if (ioError) {//Request error
                        self.dispatchEventWith(IOErrorEvent.IO_ERROR);
                    }
                    else {
                        self.dispatchEventWith(Event.COMPLETE);
                    }
                }, 0)

            }
        }

        /**
         * @private
         */
        private updateProgress(event): void {
            if (event.lengthComputable) {
                ProgressEvent.dispatchProgressEvent(this, ProgressEvent.PROGRESS, event.loaded, event.total);
            }
        }

        /**
         * @private
         */
        private onload(): void {
            let self = this;
            let xhr = this._xhr;
            let url = this._url;
            let ioError = (xhr.status >= 400);
            window.setTimeout(function (): void {
                if (ioError) {//Request error
                    self.dispatchEventWith(IOErrorEvent.IO_ERROR);
                }
                else {
                    self.dispatchEventWith(Event.COMPLETE);
                }
            }, 0);
        }

        /**
         * @private
         */
        private onerror(): void {
            let url = this._url;
            let self = this;
            window.setTimeout(function (): void {
                self.dispatchEventWith(IOErrorEvent.IO_ERROR);
            }, 0);
        }
    }
    HttpRequest = WebHttpRequest;
}