import {Component,Input,ChangeDetectionStrategy} from '@angular/core';
import { Character } from '@app/shared/interfaces/character.interfaces';


@Component({
    selector:'app-character',
    template:`
      <div class="card" >
            <div class="image">
                <a href="" [routerLink]="['./character-details',character.id]">
                    <img src="{{character.image}}" 
                    alt="character.name"
                    class="card-img-top"/>
                </a>
            </div>
            <div class="card-inner">
                <div class="header">
                    <a routerLink="/character-details/{{character.id}}">
                        <h2>{{character.name|slice: 0:15}}</h2>
                    </a>
                    <h4 class="text-muted">{{character.gender}}</h4>
                    <p>Created:</p>
                    <small class="text-muted">{{character.created|date}}</small>
                </div>
            </div>
            
        </div>
    `,
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class CharacterComponent{
    @Input()character:Character;

}