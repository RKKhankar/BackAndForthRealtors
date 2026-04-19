import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private properties = [
    {
      id: 1,
      title: 'Modern Apartment',
      price: 7500000,
      location: 'Mumbai',
      image: '/images/properties/p1.png',
      description: 'Spacious 2BHK apartment with modern amenities.',
      bhk: '2 BHK',
      area: '1200 sq.ft'
    },
    {
      id: 2,
      title: 'Luxury Villa',
      price: 15000000,
      location: 'Pune',
      image: '/images/properties/p2.png',
      description: 'Premium villa with garden and parking.',
      bhk: '4 BHK',
      area: '3000 sq.ft'
    },
    {
      id: 3,
      title: 'City Flat',
      price: 5500000,
      location: 'Thane',
      image: '/images/properties/p3.png',
      description: 'Compact and affordable city flat.',
      bhk: '1 BHK',
      area: '800 sq.ft'
    },
    {
      id: 4,
      title: 'Premium Residency',
      price: 9500000,
      location: 'Navi Mumbai',
      image: '/images/properties/p4.png',
      description: 'Well-connected residency with amenities.',
      bhk: '3 BHK',
      area: '1500 sq.ft'
    }
  ];

  // ✅ Sync methods
  getProperties() {
    return this.properties;
  }

  getPropertyById(id: number) {
    return this.properties.find(p => p.id === id);
  }

}