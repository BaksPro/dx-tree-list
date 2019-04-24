import { NgModule, Component, enableProdMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { DxTreeListModule } from "devextreme-angular";

import { Employee, Service } from "./app.service";

@Component({
  selector: "demo-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [Service]
})
export class AppComponent {
  employees: Employee[];
  lookupData: any;
  count = 1;
  rowCount = 1;
  constructor(service: Service) {
    this.employees = service.getEmployees();

    this.lookupData = {
      store: {
        type: "array",
        data: this.employees,
        sort: "Full_Name"
      }
    };
  }

  allowUpdating({ row }) {
    console.log(row);
    if (row.level !== 0) {
      return true;
    }
    return false;
  }

  editorPreparing(e) {
    if (e.dataField === "Head_ID" && e.row.data.ID === 1) {
      e.cancel = true;
    }
  }

  initNewRow(e) {
    e.data.Head_ID = 1;
  }
}

@NgModule({
  imports: [BrowserModule, DxTreeListModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
