import React, { useEffect } from "react";

function FileUpload() {
  
  useEffect(() => {
    let bar = document.getElementById("js-progressbar");
    console.log(bar)
    setTimeout(() => {
      console.log('now')
      window.UIkit.upload(".js-upload", {
        url: "",
        multiple: true,
  
        beforeSend: function() {
          console.log("beforeSend", arguments);
        },
        beforeAll: function() {
          console.log("beforeAll", arguments);
        },
        load: function() {
          console.log("load", arguments);
        },
        error: function() {
          console.log("error", arguments);
        },
        complete: function() {
          console.log("complete", arguments);
        },
  
        loadStart: function(e) {
          console.log("loadStart", arguments);
  
          bar.removeAttribute("hidden");
          bar.max = e.total;
          bar.value = e.loaded;
        },
  
        progress: function(e) {
          console.log("progress", arguments);
  
          bar.max = e.total;
          bar.value = e.loaded;
        },
  
        loadEnd: function(e) {
          console.log("loadEnd", arguments);
  
          bar.max = e.total;
          bar.value = e.loaded;
        },
  
        completeAll: function() {
          console.log("completeAll", arguments);
  
          setTimeout(function() {
            bar.setAttribute("hidden", "hidden");
          }, 1000);
  
          alert("Upload Completed");
        }
      });
    },500)

  }, []);

  return (
    <>
      <div className="js-upload uk-placeholder uk-text-center">
        <span data-uk-icon="icon: cloud-upload" />
        <span className="uk-text-middle">
          {"  "}Attach files by dropping them here or
        </span>{" "}
        <div data-uk-form-custom="">
          <input type="file" data-multiple="" />
          <span className="uk-link">selecting one</span>
        </div>
      </div>
      <progress
        id="js-progressbar"
        className="uk-progress"
        value="0"
        max="100"
        hidden
      />
    </>
  );
}

export default FileUpload;
