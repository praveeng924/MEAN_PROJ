import {Post} from "./post.model";
import { Injectable } from "@angular/core";
import{Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({providedIn:'root'})
export class Postservice
{

  private posts:Post[]=[];
  private postUpdate=new Subject<Post[]>();

  constructor(private http:HttpClient,private router:Router)
  {

  }
  getPost()
  {
    this.http.get<{message:string,posts:any}>('http://localhost:3000/api/posts').pipe(
      map((postData)=>
        {
          return postData.posts.map(post=>{
            return{
              title:post.title,content:post.content,id:post._id

            }
          })
        })
    ).subscribe((transformedPosts)=>{
this.posts=transformedPosts;
this.postUpdate.next([...this.posts]);

    });


  }
  getPostUpdateListner()
  {
    return this.postUpdate.asObservable();
  }

  getPostEdit(id:string)
  {
    return this.http.get<{_id:string,title:string,content:string}>('http://localhost:3000/api/posts/'+id);

  }
  addPost(title:string,content:string)
  {
    const post:Post={id:null,title:title,content:content};
    this.http.post<{message:string,postId:string}>('http://localhost:3000/api/posts',post).subscribe(resposeData=>{
      const id=resposeData.postId;
      post.id=id;
      this.posts.push(post);
    this.postUpdate.next([...this.posts]);
    this.router.navigate(["/"]);
    })

  }

  updatePost(id:string,title:string,content:string)
  {
const post:Post={id:id,title:title,content:content};
this.http.put('http://localhost:3000/api/posts/'+id,post).subscribe(response=>
{
  const updatedPost= [...this.posts];
  let oldPostIndex= updatedPost.findIndex(p=>p.id=post.id);
  updatedPost[oldPostIndex]=post;
  this.posts=updatedPost;
  this.postUpdate.next([...this.posts]);
  this.router.navigate(["/"]);
})
  }
  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
      .subscribe(() => {
        const updatedPost= this.posts.filter(post=>{
          return post.id!==postId
        })
        this.posts=updatedPost;
        this.postUpdate.next([...this.posts]);
      });
  }
}
