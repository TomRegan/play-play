package controllers

import play.api.mvc._

class Application extends Controller {

  def index = Action {
    val h1 = "Your new application is ready."
    Ok(views.html.index(h1))
  }


  def books = Action {
    val homePath: String = System.getenv("HOME")
    val filePath: String = s"$homePath/Books"
    Ok(views.html.books(filePath))
  }



}
