/**
  * @function reloadCOntent
  * this function is to reload the browser with existing url with the 
  * prevoius url in the testbox
  */
function reloadCOntent(){
frmBrowser.browserRichPush.url=frmBrowser.txtBoxUrl.text;
frmBrowser.browserRichPush.reload();
}