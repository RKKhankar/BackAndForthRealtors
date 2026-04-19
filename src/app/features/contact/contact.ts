import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class ContactComponent implements OnInit {

  mode: 'property' | 'general' = 'property';

  // Common fields
  name = '';
  phone = '';
  email = '';
  message = '';
  propertyName = ''; // preselected property id/name when coming from a listing

  // General enquiry fields
  propertyType = '';
  budget = '';
  city = '';
  location = '';
  configuration = '';
  area: number | null = null;
  possession = '';
  moveInDate = '';
  furnishing = '';
  parking = '';
  amenities: string[] = [];
  visit = '';
  negotiation = ''; // negotiation preference (used in property mode)

  // Option lists (centralized)
  budgetOptions = [
    { value: '50L-75L', label: '₹50L – ₹75L' },
    { value: '75L-1Cr', label: '₹75L – ₹1Cr' },
    { value: '1Cr-1.5Cr', label: '₹1Cr – ₹1.5Cr' },
    { value: '1.5Cr-2Cr', label: '₹1.5Cr – ₹2Cr' },
    { value: '2Cr+', label: '₹2Cr+' }
  ];

  parkingOptions = ['Open', 'Covered', 'Basement', 'Multiple'];
  siteVisitOptions = ['Weekdays', 'Weekends', 'Anytime', 'Virtual Tour'];
  negotiationOptions = ['Fixed Price', 'Slightly Negotiable', 'Highly Negotiable'];
  amenitiesOptions = ['Gym', 'Swimming Pool', 'Garden', 'Security', 'Clubhouse', "Children's Play Area"];

  // City -> area map
  cityAreas: Record<string, string[]> = {
    Pune: ['Baner', 'Wakad', 'Hinjewadi', 'Kothrud'],
    Mumbai: ['Andheri', 'Borivali', 'Powai', 'Dadar'],
    Thane: ['Ghodbunder Road', 'Majiwada', 'Vartak Nagar'],
    'Navi Mumbai': ['Vashi', 'Nerul', 'Kharghar', 'Belapur']
  };

  // Property list for non-logged-in selection (example)
  availableProperties = [
    { id: 'prop-A', label: 'Property A - Baner' },
    { id: 'prop-B', label: 'Property B - Andheri' },
    { id: 'prop-C', label: 'Property C - Vashi' }
  ];

  submitted = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.propertyName = params['property'] || '';
      if (params['mode']) {
        this.mode = params['mode'] === 'general' ? 'general' : 'property';
      } else if (!this.propertyName) {
        this.mode = 'general';
      }
    });
  }

  // Toggle amenity checkbox
  toggleAmenity(option: string) {
    const idx = this.amenities.indexOf(option);
    if (idx === -1) this.amenities.push(option);
    else this.amenities.splice(idx, 1);
  }

  // Validation helpers
  isPhoneValid(): boolean {
    return /^[0-9]{10}$/.test(this.phone);
  }

  isEmailValid(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
  }

  isLocationValid(): boolean {
    if (!this.city) return true;
    return !!this.location;
  }

  // Final submit
  submitForm(form?: NgForm) {
    if (form) {
      Object.values(form.controls).forEach(c => c.markAsTouched());
    }

    if (!this.name || !this.phone || !this.email) return;
    if (!this.isPhoneValid() || !this.isEmailValid()) return;
    if (!this.isLocationValid()) return;
    if (this.mode === 'property' && !this.propertyName) return;

    this.submitted = true;

    // Capture system enquiry date/time
    const enquiryDate = new Date();
    const enquiryDateISO = enquiryDate.toISOString();
    const enquiryDateFormatted = enquiryDate.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata'
    });

    const payload = {
      mode: this.mode,
      name: this.name,
      phone: this.phone,
      email: this.email,
      property: this.propertyName,
      negotiation: this.negotiation,
      message: this.message,
      propertyType: this.propertyType,
      budget: this.budget,
      city: this.city,
      location: this.location,
      configuration: this.configuration,
      area: this.area,
      possession: this.possession,
      moveInDate: this.moveInDate,   // user‑entered
      furnishing: this.furnishing,
      parking: this.parking,
      amenities: this.amenities,
      visit: this.visit,
      enquiryDateISO: enquiryDateISO,           // system‑captured (raw ISO)
      enquiryDateFormatted: enquiryDateFormatted // human‑friendly
    };

    console.log('FORM SUBMIT:', payload);

    // API call example:
    // this.http.post('https://your-api-endpoint.com/enquiries', payload).subscribe(...)
  }
}
