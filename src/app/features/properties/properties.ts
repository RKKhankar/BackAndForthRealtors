import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from '../../core/property';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './properties.html',
  styleUrls: ['./properties.css']
})
export class PropertiesComponent implements OnInit {

  properties: any[] = [];
  filteredProperties: any[] = [];
  searchText: string = '';

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.properties = this.propertyService.getProperties();
    this.filteredProperties = this.properties;
  }

  filterProperties() {
    this.filteredProperties = this.properties.filter(p =>
      p.location.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  viewDetails(property: any) {
    this.router.navigate(['/property', property.id]);
  }
}