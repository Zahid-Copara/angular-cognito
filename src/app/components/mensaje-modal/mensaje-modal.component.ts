import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mensaje-modal',
  templateUrl: './mensaje-modal.component.html',
  styleUrls: ['./mensaje-modal.component.scss']
})
export class MensajeModalComponent implements OnInit {
  
  @Input() mensaje : string = '';
  @Output() cerrarModal = new EventEmitter<boolean>();
  constructor() {}
  
  ngOnInit(): void {
      
  }

  clicCerrarModal() {
    this.cerrarModal.emit(true);
  }

}
