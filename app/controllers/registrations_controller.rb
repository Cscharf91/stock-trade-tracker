class RegistrationsController < Devise::RegistrationsController
  
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user
    else
      warden.custom_failure!
      render json: { trade.errors.messages }, status: 422
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user
    else
      warden.custom_failure!
      render json: { trade.errors.messages }, status: 422
    end

  def destroy
    @user = User.find_by_email(user_params[:email])
    if @user.destroy
      render :json=> { success: 'user was successfully deleted' }, :status=>201
    else
      render :json=> { error: 'user could not be deleted' }, :status=>422
    end
  end

  private

  def user_params
      params.require(:user).permit(:email, :password, :password_confirmation)
  end
end