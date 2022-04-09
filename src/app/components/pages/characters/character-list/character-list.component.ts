import { IfStmt } from '@angular/compiler';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationEnd,ParamMap, Router, ROUTES } from '@angular/router';
import { Character } from '@app/shared/interfaces/character.interfaces';
import { CharacterService } from '@app/shared/services/character.service';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { take,filter} from "rxjs/operators";
import {DOCUMENT} from "@angular/common";

type ResquestInfo={
  next:string;
}
@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {
  
  characters:Character[]=[];
  info: ResquestInfo={
    next:null!,
  }
  showGoUpButton=false;
    private pageNum=1;
    private query:string="";
    private hideScrollHeigth=200;
    private showScrollHeigth=500;
  constructor(
    @Inject(DOCUMENT) private document:Document,
    private characterSvc:CharacterService,
    private route:ActivatedRoute,
    private router:Router


  ) { 
    this.onUrlChanged();
  }

  ngOnInit(): void {
    
    this.getCharacterByQuery()
  }

   @HostListener('window:scroll',[])
   onWindowScroll():void{
      const yOffSet= window.pageYOffset;
      if((yOffSet||this.document.documentElement.scrollTop||this.document.body.scrollTop)>this.showScrollHeigth){
        this.showGoUpButton = true;
      }else if(this.showGoUpButton &&(yOffSet||this.document.documentElement.scrollTop || this.document.body.scrollTop ||this.showScrollHeigth)){
         this.showGoUpButton=false;
      }
   }
   onScrollDown():void{
     if(this.info.next){
       this.pageNum++
       this.getDataFromService();
     }
  }

  onScrollTop():void{
   this.document.body.scrollTop=0;//safari
   this.document.documentElement.scrollTop=0;//otros navegadores
  }

  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.pageNum = 1;
        this.getCharacterByQuery();
      });
  }

  private getCharacterByQuery():void{
    this.route.queryParams.pipe(
      take(1)
    ).subscribe(params=>{
      //console.log('Params->',params)
        this.query=params['q'];
        this.getDataFromService()
    });
  }

  private getDataFromService():void{
    this.characterSvc.searchCharacter(this.query,this.pageNum)
    .pipe(
      take(1),
    ).subscribe((res:any)=>{

      if(res?.results.length){
        const {info,results}=res
        this.characters=[...this.characters,...results];
        this.info = info;
      }else{
        this.characters=[];
      }
      
    
    })
  }

}
