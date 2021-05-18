import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormatPipe } from "./format.pipe";

@NgModule({
  imports: [CommonModule],
  exports: [FormatPipe],
  declarations: [FormatPipe],
  providers: [FormatPipe]
})
export class PipesModule { }
