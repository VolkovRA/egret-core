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

namespace egret
{
    /**
     * Registers the runtime class information for a class.
     * This method adds some strings which represent the class name or some interface names to the class definition.
     * After the registration,you can use egret.is() method to do the type checking for the instance of this class.
     * 
     * Note: If you use the TypeScript programming language, the egret command line tool will automatically generate
     * the registration code line. You don't need to manually call this method.
     *
     * The following code shows how to register the runtime class information for the EventDispatcher
     * class and do the type checking:
     * @example 
     *      egret.registerClass(egret.EventDispatcher,"egret.EventDispatcher",["egret.IEventDispatcher"]);
     *      let dispatcher = new egret.EventDispatcher();
     *      egret.log(egret.is(dispatcher, "egret.IEventDispatcher"));  // true.
     *      egret.log(egret.is(dispatcher, "egret.EventDispatcher"));   // true.
     *      egret.log(egret.is(dispatcher, "egret.Bitmap"));   // false.
     * @param classDefinition The class definition to be registered.
     * @param className A unique identification string of the specific class.
     * @param interfaceNames A list of unique identification string of the specific interfaces.
     * @version Egret 2.4
     * @platform Web,Native
     */
    export function registerClass(classDefinition: any, className: string, interfaceNames?: string[]): void {
        let prototype: any = classDefinition.prototype;
        Object.defineProperty(prototype, '__class__', {
            value: className,
            enumerable: false,
            writable: true
        });

        let types = [className];
        if (interfaceNames) {
            types = types.concat(interfaceNames);
        }

        let superTypes = prototype.__types__;
        if (prototype.__types__) {
            let length = superTypes.length;
            for (let i = 0; i < length; i++) {
                let name = superTypes[i];
                if (types.indexOf(name) == -1) {
                    types.push(name);
                }
            }
        }

        Object.defineProperty(prototype, '__types__', {
            value: types,
            enumerable: false,
            writable: true
        });
    }
}