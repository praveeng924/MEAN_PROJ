import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import{Post} from '../post.model';
import { Postservice } from "../posts.service";
import{Subscription} from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit,OnDestroy {
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
private postSub= new Subscription();

constructor(public postService:Postservice)
{

}
  postss:Post[] = [];
  ngOnInit()
  {
    this.postService.getPost();
    this.postService.getPostUpdateListner().subscribe((posts:Post[])=>{
      this.postss=posts;
    })
  }

  onDelete(postId:string)
  {
      this.postService.deletePost(postId);
  }
  ngOnDestroy()
  {
   return this.postSub.unsubscribe();
  }
}
