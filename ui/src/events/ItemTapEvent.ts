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

namespace eui
{
    /**
     * Represents events that are dispatched when a item has been touched.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @includeExample extension/eui/events/ItemTapEventExample.ts
     */
    export class ItemTapEvent extends egret.Event
    {
        /**
         * The type of the event object for an *itemTap* event.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public static ITEM_TAP = "itemTap";

        /**
         * The item in the data provider of the associated item.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public item:any = null;

        /**
         * The item renderer in the list of the associated item.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public itemRenderer:IItemRenderer = null;

        /**
         * The index of the associated navigation item.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public itemIndex:number = -1;

        /**
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected clean():void{
            super.clean();
            this.item = this.itemRenderer = null;
        }

        /**
         * Dispatch an event with specified EventDispatcher.
         * The dispatched event will be cached in the object pool, for the next cycle of reuse.
         * @param target the target of event dispatcher.
         * @param eventType The event type; indicates the action that triggered the event.
         * @param itemRenderer The item renderer in the list of the associated item.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public static dispatchItemTapEvent(target:egret.IEventDispatcher, eventType:string, itemRenderer?:IItemRenderer):boolean {
            if (!target.hasEventListener(eventType)) {
                return true;
            }
            let event = egret.Event.create(ItemTapEvent, eventType);
            event.item = itemRenderer.data;
            event.itemIndex = itemRenderer.itemIndex;
            event.itemRenderer = itemRenderer;
            let result = target.dispatchEvent(event);
            egret.Event.release(event);
            return result;
        }
    }
}