import { Injectable } from '@angular/core';
import {Content} from '../helper-files/content-interface';
import {Observable, of} from 'rxjs';
import {contentList} from '../helper-files/contentDb';
import {MessageService} from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-type':
        'application/json' })
  };
  constructor(private messageService: MessageService, private http: HttpClient) { }
  getContentObs(): Observable<Content[]>{
    this.messageService.add('Content Service: Fetched Content');
    return of(contentList);
    this.http.get<Content[]>('api/content').subscribe(content => console.log(content));
    return this.http.get<Content[]>('api/content');
  }
  addContent(content: Content): Observable<Content>{
    return this.http.post<Content>('api/content'
      ,
      content, this.httpOptions);
  }
  updateContent(content: Content): Observable<any>{
    return this.http.put('api/content'
      , content,
      this.httpOptions);
  }
}
