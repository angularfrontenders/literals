import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ResourcesService } from './resources.service';
import { DataService } from './data.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [],
  providers: [DataService, ResourcesService]
})
export class ResourcesModule {}
