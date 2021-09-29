import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[forEsp]'
})
export class ForEspDirective {

  @Input() set forEsp( condition: number) {
    if(condition>0) {
      for(let i=0; i<condition; i++)
        this.viewcontainerRef.createEmbeddedView(this.templateRef)
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewcontainerRef: ViewContainerRef) { }

}
