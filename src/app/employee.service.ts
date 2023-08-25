import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({ providedIn: 'root' })
export class employeeService {
  loader:boolean = false
  constructor(private http: HttpClient) {}

  postRequest(postData: any) {
    return this.http.post(`${environment.baseUrl}/employees.json`, postData);
  }
  getRequest() {
    return this.http
      .get(
        'https://curd-operation-b7d04-default-rtdb.firebaseio.com/employees.json'
      )
      .pipe(
        map((resData: any) => {
          let empArray = [];
          for (let key in resData) {
            if (resData.hasOwnProperty(key)) {
              empArray.push({ ...resData[key], id: [key] });
            }
          }
          return empArray;
        })
      );
  }
  deleteRequest(emp: any) {
    return this.http.delete(
      `https://curd-operation-b7d04-default-rtdb.firebaseio.com/employees/${emp.id}.json`
    );
  }
  putRequest(data:any,id:string){
    return this.http.put(`https://curd-operation-b7d04-default-rtdb.firebaseio.com/employees/${id}.json`,data)
  }
}
