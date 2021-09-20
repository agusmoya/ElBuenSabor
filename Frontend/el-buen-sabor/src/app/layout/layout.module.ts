import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  exports: [NavbarComponent, FooterComponent],
  imports: [CommonModule, AppRoutingModule],
})
export class LayoutModule {}
