module Api
  module V1
    class TradesController < ApplicationController
      protect_from_forgery with: :null_session
      before_action :authenticate_user!
      skip_before_action :verify_authenticity_token

      def index
        trades = Trade.where(user_id: current_user.id).order('created_at DESC')

        render json: TradeSerializer.new(trades).serialized_json
      end

      def show
        trade = Trade.find(params[:id])

        render json: TradeSerializer.new(trade).serialized_json
      end

      def create
        trade = current_user.trades.build(trade_params)
        
        if trade.save
          puts trade
          render json: TradeSerializer.new(trade).serialized_json
        else
          render json: { error: trade.errors.messages }, status: 422
        end
      end

      def update
        trade = Trade.find(params[:id])

        if trade.update
          render json: TradeSerializer.new(trade).serialized_json
        else
          render json: { error: trade.errors.messages }, status: 422
        end
      end

      def destroy
        trade = Trade.find(params[:id])

        if trade.destroy
          head :no_content
        else
          render json: { error: trade.errors.messages }, status: 422
        end
      end

      # def search
      #   if params[:market] == "Account Number"
      #     trades = Trade.find_by(market: params[:market])
      #   end
      #   if params[:search_type] == "Last Name"
      #     trades += Trade.find_by(lname: params[:search])
      #   end
      #   if params[:search_type] == "Date of Birth"
      #     trades += Trade.find_by(dob: params[:search])
      #   end
      # end

      private

      def trade_params
        params.require(:trade).permit(:stock_symbol, :trade_date, :market, :volume, :performance, :trade_change, :user_id)
      end
    end
  end
end