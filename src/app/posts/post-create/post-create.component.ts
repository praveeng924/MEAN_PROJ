import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Postservice } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Post } from "../post.model";
@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  public post:Post;
  private mode="create";
  private postId:string;


  constructor(public postService:Postservice, public route:ActivatedRoute)
  {

  }

  ngOnInit()
  {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>
    {
      if(paramMap.has('postId'))
      {
        this.mode='edit';
        this.postId=paramMap.get('postId');
        this.postService.getPostEdit(this.postId).subscribe(postData=>
          this.post={id:postData._id,title:postData.title,content:postData.content});
      }
      else{
        this.mode='create';
        this.postId=null;

      }
    })

  }
  onSavePost(Form:NgForm) {
    if(Form.invalid)
    {
      return;
    }
    if(this.mode==="create")
    {
      this.postService.addPost(Form.value.title,Form.value.content);
    }
    else{
      this.postService.updatePost(this.postId,Form.value.title,Form.value.content);
    }

  }
}
