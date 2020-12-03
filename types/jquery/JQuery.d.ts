import jquery from 'jquery';

const $: JQueryStatic = jquery;
//
//
declare global {
  namespace JQShortNS {
    type Static$ = JQueryStatic;
  }
}
