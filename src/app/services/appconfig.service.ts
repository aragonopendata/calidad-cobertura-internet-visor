
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class AppconfigService {
  constructor(private http: HttpClient) {
  }

  loadConfig() {
    return this.http.get("../assets/webconfig.json")
      
    
  }
}