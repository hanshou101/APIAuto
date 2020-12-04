import Vue, {VueConstructor} from 'vue/types/vue';              // WARN 这句话，是必须要的。

declare module 'vue/types/vue' {
// declare module 'vue' {

  interface VueConstructor<T extends Vue = Vue> {
    getTyp(val: any): string;         //
    isObjectArr(val: any): boolean;   //
    fold($event: Event): void;        //
    expand($event: Event): void;      //
    expandTarget($event: Event): JQuery<HTMLElement>;   //
    formatVal(val: any): string;      //
    isaLink(val: string): boolean;    //
    objLength(obj: object): number;   //
    onRenderJSONItem(val: Array | object, key: null | string, path: string): any;   //
    setResponseHint(val: object | Array, key: string, $event: Event): void;         //
    getResponseHint(val: object | Array, key: string, $event: Event): string;         //
  }

  interface Vue {

  }

  interface VueI18n {

  }
}
