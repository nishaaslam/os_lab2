import { Renderer2 } from "@angular/core";


export class Helpers {
  constructor(private renderer: Renderer2) { }

  public static trimObject(item: any) {
    if (item)
      for (var key in item) {
        if (
          (typeof item[key] === "string" || item[key] instanceof String) &&
          item[key] != null &&
          item[key] &&
          key != "currentPassword"
        )
          item[key] = item[key].trim();
        else if (item[key] instanceof Array && item[key] != null && item[key]) {
          var arr = item[key];
          for (var key1 in arr) {
            var obj = arr[key1];
            if (obj instanceof Object) {
              for (var key2 in obj) {
                if (
                  (typeof obj[key2] === "string" ||
                    obj[key2] instanceof String) &&
                  obj[key2] != null &&
                  obj[key2] &&
                  key != "currentPassword"
                )
                  obj[key2] = obj[key2].trim();
              }
            }
          }
        }
      }
    return item;
  }

}