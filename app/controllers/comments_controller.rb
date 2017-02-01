class CommentsController < ApplicationController

  def index
    @comments = Comment.all
  end


  def new
    @song = Song.find(params[:song_id])
    @comment = Comment.new
  end

  def create
    @user = current_user
    @song = Song.find(params[:song_id])
    @comment = Comment.new(comment_params)
    @comment.song = @song
    @comment.user = @user
    if @comment.save
      flash[:notice] = "Comment created successfully!"
      redirect_to @song
    else
      flash[:notice] = @review.errors.full_messages.to_sentence
      render :new
    end
  end

  def edit
    @comment = Comment.find(params[:id])
    @song = @comment.song
    @user = current_user

    if @user.id == @comment.user_id || @user.admin?
      render :edit
    else
      flash[:notice] = "You don't have permission to edit this comment!"
      redirect_to @song
    end
  end

  def update
    binding.pry
    @comment = Comment.find(params[:id])
    @song = @comment.song

    if @comment.update(comment_params)
      redirect_to @song
    else
      render :edit
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @song = @comment.song
    @user = current_user

    if @user.id == @comment.user_id || @user.admin?
      @comment.destroy
      redirect_to @song
    else
      flash[:notice] = "You don't have permission to delete this comment!"
      redirect_to @song
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

end
