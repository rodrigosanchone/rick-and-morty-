import { Injectable } from '@angular/core';
import {HttpClient} from  '@angular/common/http'
import { environment } from '@environments/environment';
import { Character } from '@shared/interfaces/character.interfaces';
import { Observable } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(
    private http: HttpClient
  ) { }


  searchCharacter(query='',page=1){
     return this.http.get<Character[]>(`${environment.baseUrlApi}/?name=${query}&page=${page}`)
  }

  getDetails(id:string):Observable<Character> {
    return this.http.get<Character>(`${environment.baseUrlApi}/${id}`);
  }
}
