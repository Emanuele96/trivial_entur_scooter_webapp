import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {
  @Input() buttonText : string = '';
  @Input() callbackFunctionParams : any = [];
  @Input() callbackFunction!: (args: any) => void;
  
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.callbackFunction(this.callbackFunctionParams);
  }

}
