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
     * Linear layout base class, usually as the parent class of
     * *HorizontalLayout* and *VerticalLayout*.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     */
    export class LinearLayoutBase extends LayoutBase
    {
        /**
         * @private
         */
        $horizontalAlign = "left";

        /**
         * The horizontal alignment of layout elements.
         * 
         * The *egret.HorizontalAlign* and *eui.JustifyAlign* class defines the possible values for this property.
         * @default "left"
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public get horizontalAlign():string {
            return this.$horizontalAlign;
        }

        public set horizontalAlign(value:string) {
            if (this.$horizontalAlign == value)
                return;
            this.$horizontalAlign = value;
            if (this.$target)
                this.$target.invalidateDisplayList();
        }

        /**
         * @private
         */
        $verticalAlign:string = "top";

        /**
         * The vertical alignment of layout elements.
         * 
         * The *egret.VerticalAlign* and *eui.JustifyAlign* class
         * defines the possible values for this property.
         * @default "top"
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public get verticalAlign():string {
            return this.$verticalAlign;
        }

        public set verticalAlign(value:string) {
            if (this.$verticalAlign == value)
                return;
            this.$verticalAlign = value;
            if (this.$target)
                this.$target.invalidateDisplayList();
        }

        /**
         * @private
         */
        $gap:number = 6;

        /**
         * The space between layout elements, in pixels.
         * @default 6
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public get gap():number {
            return this.$gap;
        }

        public set gap(value:number) {
            value = +value || 0;
            if (this.$gap === value)
                return;
            this.$gap = value;
            this.invalidateTargetLayout();
        }

        /**
         * @private
         */
        $paddingLeft:number = 0;

        /**
         * Number of pixels between the container's left edge and the left edge of the first layout element.
         * @default 0
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public get paddingLeft():number {
            return this.$paddingLeft;
        }

        public set paddingLeft(value:number) {
            value = +value || 0;
            if (this.$paddingLeft === value)
                return;

            this.$paddingLeft = value;
            this.invalidateTargetLayout();
        }

        /**
         * @private
         */
        $paddingRight:number = 0;

        /**
         * Number of pixels between the container's right edge and the right edge of the last layout element.
         * @default 0
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public get paddingRight():number {
            return this.$paddingRight;
        }

        public set paddingRight(value:number) {
            value = +value || 0;
            if (this.$paddingRight === value)
                return;

            this.$paddingRight = value;
            this.invalidateTargetLayout();
        }

        /**
         * @private
         */
        $paddingTop:number = 0;

        /**
         * The minimum number of pixels between the container's top edge and
         * the top of all the container's layout elements.
         * @default 0
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public get paddingTop():number {
            return this.$paddingTop;
        }

        public set paddingTop(value:number) {
            value = +value || 0;
            if (this.$paddingTop === value)
                return;

            this.$paddingTop = value;
            this.invalidateTargetLayout();
        }

        /**
         * @private
         */
        $paddingBottom:number = 0;

        /**
         * The minimum number of pixels between the container's bottom edge
         * and the bottom of all the container's layout elements.
         * @default 0
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public get paddingBottom():number {
            return this.$paddingBottom;
        }

        public set paddingBottom(value:number) {
            value = +value || 0;
            if (this.$paddingBottom === value)
                return;

            this.$paddingBottom = value;
            this.invalidateTargetLayout();
        }

        /**
         * Convenience function for subclasses that invalidates the
         * target's size and displayList so that both layout's *measure()*
         * and *updateDisplayList* methods get called.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected invalidateTargetLayout():void {
            let target = this.$target;
            if (target) {
                target.invalidateSize();
                target.invalidateDisplayList();
            }
        }

        /**
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public measure():void {
            if (!this.$target)
                return;
            if (this.$useVirtualLayout) {
                this.measureVirtual();
            }
            else {
                this.measureReal();
            }
        }

        /**
         * Compute exact values for measuredWidth and measuredHeight.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected measureReal():void {
        }

        /**
         * Compute potentially approximate values for measuredWidth and measuredHeight.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected measureVirtual():void {

        }

        /**
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public updateDisplayList(width:number, height:number):void {
            let target = this.$target;
            if (!target)
                return;

            if (target.numElements == 0) {
                target.setContentSize(Math.ceil(this.$paddingLeft + this.$paddingRight),
                    Math.ceil(this.$paddingTop + this.$paddingBottom));
                return;
            }

            if (this.$useVirtualLayout) {
                this.updateDisplayListVirtual(width, height);
            }
            else {
                this.updateDisplayListReal(width, height);
            }
        }

        /**
         * An Array of the virtual layout elements size cache.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected elementSizeTable:number[] = [];

        /**
         * Gets the starting position of the specified index element.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected getStartPosition(index:number):number {
            return 0;
        }

        /**
         * Gets the size of the specified index element.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected getElementSize(index:number):number {
            return 0;
        }

        /**
         * Gets the sum of the size of cached elements.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected getElementTotalSize():number {
            return 0;
        }

        /**
         * @param index 
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public elementRemoved(index:number):void {
            if (!this.$useVirtualLayout)
                return;
            super.elementRemoved(index);
            this.elementSizeTable.splice(index, 1);
        }

        /**
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public clearVirtualLayoutCache():void {
            if (!this.$useVirtualLayout)
                return;
            this.elementSizeTable = [];
            this.maxElementSize = 0;
        }

        /**
         * The binary search to find the specified index position of the display object.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected findIndexAt(x:number, i0:number, i1:number):number {
            let index = ((i0 + i1) * 0.5)|0;
            let elementX = this.getStartPosition(index);
            let elementWidth = this.getElementSize(index);
            if ((x >= elementX) && (x < elementX + elementWidth + this.$gap))
                return index;
            else if (i0 == i1)
                return -1;
            else if (x < elementX)
                return this.findIndexAt(x, i0, Math.max(i0, index - 1));
            else
                return this.findIndexAt(x, Math.min(index + 1, i1), i1);
        }

        /**
         * The first element index in the view of the virtual layout.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected startIndex:number = -1;

        /**
         * The last element index in the view of the virtual layout.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected endIndex:number = -1;

        /**
         * A Flag of the first element and the end element has been calculated.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected indexInViewCalculated:boolean = false;

        /**
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        public scrollPositionChanged():void {
            super.scrollPositionChanged();
            if (this.$useVirtualLayout) {
                let changed = this.getIndexInView();
                if (changed) {
                    this.indexInViewCalculated = true;
                    this.target.invalidateDisplayList();
                }
            }

        }

        /**
         * Get the index of the first and last element in the view,
         * and to return whether or not to change.
         * @return Has the index changed.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected getIndexInView():boolean {
            return false;
        }

        /**
         * The maximum size of elements.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected maxElementSize:number = 0;

        /**
         * Update the layout of the virtualized elements.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected updateDisplayListVirtual(width:number, height:number):void {
        }

        /**
         * Update the layout of the reality elements.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected updateDisplayListReal(width:number, height:number):void {
        }

        /**
         * Allocate blank area for each variable size element.
         * @version Egret 2.4
         * @version eui 1.0
         * @platform Web,Native
         */
        protected flexChildrenProportionally(spaceForChildren:number, spaceToDistribute:number,
                                             totalPercent:number, childInfoArray:any[]):void {

            let numElements:number = childInfoArray.length;
            let done:boolean;

            do {
                done = true;

                let unused:number = spaceToDistribute -
                    (spaceForChildren * totalPercent / 100);
                if (unused > 0)
                    spaceToDistribute -= unused;
                else
                    unused = 0;

                let spacePerPercent:number = spaceToDistribute / totalPercent;

                for (let i:number = 0; i < numElements; i++) {
                    let childInfo:sys.ChildInfo = childInfoArray[i];

                    let size:number = childInfo.percent * spacePerPercent;

                    if (size < childInfo.min) {
                        let min:number = childInfo.min;
                        childInfo.size = min;

                        childInfoArray[i] = childInfoArray[--numElements];
                        childInfoArray[numElements] = childInfo;

                        totalPercent -= childInfo.percent;
                        if (unused >= min) {
                            unused -= min;
                        }
                        else {
                            spaceToDistribute -= min - unused;
                            unused = 0;
                        }
                        done = false;
                        break;
                    }
                    else if (size > childInfo.max) {
                        let max:number = childInfo.max;
                        childInfo.size = max;

                        childInfoArray[i] = childInfoArray[--numElements];
                        childInfoArray[numElements] = childInfo;

                        totalPercent -= childInfo.percent;
                        if (unused >= max) {
                            unused -= max;
                        }
                        else {
                            spaceToDistribute -= max - unused;
                            unused = 0;
                        }
                        done = false;
                        break;
                    }
                    else {
                        childInfo.size = size;
                    }
                }
            }
            while (!done);
        }
    }
}

namespace eui.sys
{
    /**
     * @private
     */
    export class ChildInfo
    {
        /**
         * @private
         */
        public layoutElement:eui.UIComponent = null;

        /**
         * @private
         */
        public size:number = 0;

        /**
         * @private
         */
        public percent:number = NaN;

        /**
         * @private
         */
        public min:number = NaN;

        /**
         * @private
         */
        public max:number = NaN;
    }
}