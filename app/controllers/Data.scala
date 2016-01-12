package controllers

import java.io.File
import play.api.libs.json._
import play.api.mvc._

import play.api.libs.json.{Json, JsObject, JsValue}

/**
  * Provides data API endpoints
  */
class Data extends Controller {

  def books = Action {
    val homePath: String = System.getenv("HOME")
    val filePath: String = s"$homePath/Books"
    val books: Seq[String] = files(new java.io.File(filePath)).map(_.getPath)
    val data: JsValue = JsObject(Seq(
      "data" -> Json.toJson(books),
      "errors" -> Json.arr(),
      "meta" -> Json.obj()
    ))
    Ok(data)
  }

  private def files(base: java.io.File): Seq[File] = {
    rec_ls(base)
      .filter(_.isFile)
      .filter(!_.getName.startsWith("."))

  }

  private def rec_ls(base: java.io.File): Seq[File] = {
    val files = base.listFiles
    files ++ files
      .filter(_.isDirectory)
      .filter(!_.getName.startsWith("@"))
      .flatMap(rec_ls)
  }
}
