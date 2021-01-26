import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

  data = [{
    city: 'Bengaluru',
    country: 'India'
  }, {
    city: 'San Francisco',
    country: 'USA'
  }, {
    city: 'Kiev',
    country: 'Ukraine'
  }, {
    city: 'Pune',
    country: 'India'
  }, {
    city: 'Mumbai',
    country: 'India'
  }, {
    city: 'Surat',
    country: 'India'
  }];

  index = [];
  locations = [];
  minimized = false;
  collapsed = false;

  constructor() { }

  ngOnInit(): void {
    this.locations = this.data.map(obj => {
      obj['locName'] = obj.city + ' - ' + obj.country;
      obj['checked'] = false;
      obj['firstLetter'] = obj.city.substr(0, 1).toUpperCase();
      return obj;
    }).sort(this.compare);

    this.data.forEach(obj => {
      let letter = obj.city.substr(0, 1).toUpperCase();
      if (this.index.indexOf(letter) === -1) {
        this.index.push(letter);
      }
    });

    this.index = this.index.sort();
    console.log(this.locations);
  }

  compare(a: any, b: any) {
    if (a.locName < b.locName) {
      return -1;
    }
    if (a.locName > b.locName) {
      return 1;
    }
    return 0;
  }

  onFilterLocations(e: any) {
    let input = e.target.value;
    this.locations = this.data.map(obj => {
      obj['locName'] = obj.city + ' - ' + obj.country;
      obj['checked'] = false;
      return obj;
    }).sort();
    if (input.length > 0) {
      this.locations = this.locations.filter(obj => obj['locName'].toLowerCase().includes(input.toLowerCase())).sort();
    }
  }

  onClearAll() {
    console.log("Clear all selections", this.locations);
    this.locations.map(obj => obj.checked = false);
  }

  onMinimize() {
    this.collapsed = true;
    this.minimized = true;
  }

  onMaximize() {
    this.minimized = false;
    this.collapsed = false;
  }

  onCollapse() {
    this.collapsed = true;
  }

  onExpand() {
    this.minimized = false;
    this.collapsed = false;
  }

  onIndexClick(e: any) {
    console.log("Index ", e.target.innerText);
  }

}
