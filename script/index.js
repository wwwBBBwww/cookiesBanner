const modal = document.querySelector(".jetbrains-cookies-banner");
const bannerInput = document.querySelector(".jetbrains-cookies-banner__input");
const text = modal.querySelector(".jetbrains-cookies-banner__text");
const cursor = document.querySelector(".jetbrains-cookies-banner__cursor");
const command = modal.querySelector(".jetbrains-cookies-banner__command");

const modalOptions = function () {
const options = {
    open() { modal.dataset.hide ='open'  },
    close() {  modal.dataset.hide ='hide'  },
    destroyed() {
      modal.removeEventListener("click", listener);
      bannerInput.removeEventListener("input", listenerInput);
      window.removeEventListener("resize", redactionTxtButtonYesNo);
    },
    clearValue(){    
      bannerInput.value = "";
      text.textContent = "";
    },
    setCookie(){
    let date = new Date(Date.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = "window=close; expires=" + date;
    },
    getCookie(name) {
      let matches = document.cookie.match(
        new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)" ));
      return matches ? decodeURIComponent(matches[1]) : undefined;
    }
  };
  return options;
}
  const $modalOptions = modalOptions();

const listener = (e) => {
  if (e.target.className == "jetbrains-cookies-banner__btn"){ $modalOptions.close(); $modalOptions.destroyed(); }
  if (e.target.className !== "jetbrains-cookies-banner__btn"){ bannerInput.focus(); cursor.dataset.cursor = "true";}
};
modal.addEventListener("click", listener);
bannerInput.addEventListener("blur", () => { cursor.dataset.cursor = "false";});


const listenerInput = () => {text.textContent = bannerInput.value;};
bannerInput.addEventListener("input", listenerInput);

const btnYes = (event)=> {
  $modalOptions.setCookie();
  $modalOptions.close();
  $modalOptions.destroyed();
  event.preventDefault();
}
const btnNo = (event) => {
  $modalOptions.close();
  $modalOptions.destroyed();
  event.preventDefault();
};


bannerInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    formCommand(bannerInput.value);
  }
});


const formCommand = function (value) {
  if (/^[nN]$|^[nN][oO]$/.test(value)) {
      $modalOptions.close();$modalOptions.destroyed();
  }
  else if (/^[yY]$|^[Yy][eE][sS]$/.test(value)) {
    $modalOptions.setCookie();$modalOptions.close();$modalOptions.destroyed();
  }
  else if (/^[cC][lL][eE][aA][rR]$/.test(value)) {
    let commandMessage = document.querySelectorAll('[data-node="false"]');
    for (let item of commandMessage) {  item.remove();  }
        $modalOptions.clearValue();
        modal.dataset.scroll = false;
      }
      else if (/^$/.test(value)) {return }
      else if (/^[hH][eE][lL][pP]$/.test(value)) {
      createDomFragmentHelp();
          modal.dataset.scroll = true;
          modal.scrollTop += 144;
          $modalOptions.clearValue();
      }
      else {
        createDomFragment();
    modal.dataset.scroll = true;
    modal.scrollTop += 64;
    $modalOptions.clearValue();
  }
};

  (function() {
    let a = $modalOptions.getCookie("window");
    if (a == "close") { $modalOptions.close(); }
    else{setTimeout($modalOptions.open, 1000);}
  }
  ())




function createDomFragment() {
  const fragmentNode = new DocumentFragment();

  const elmDiv = document.createElement("DIV");
  elmDiv.classList.add("jetbrains-cookies-banner__command-message");
  elmDiv.textContent = "Command not found. Type `help` to see all commands.";
  elmDiv.dataset.node = false;

  const node = command.cloneNode(true);
  node.dataset.node = false;
  node.querySelector(".jetbrains-cookies-banner__cursor").dataset.cursor='false';

  fragmentNode.append(node);
  fragmentNode.append(elmDiv);
  command.before(fragmentNode);
}

function createDomFragmentHelp() {
  command.insertAdjacentHTML(
    "beforebegin",
    '<div class="jetbrains-cookies-banner__help" data-node="false">Type `y` or `yes` if you agree that JetBrains may use cookies and IP address to collect individual statistics and to provide you with personalized offers.<br><br>Type `n` or `no` if you don’t want JetBrains to collect individual statistics and to provide you with personalized offers.<br><br>Use `clear` to reset the terminal.</div>'
  );
}



const redactionTxtButtonYesNo = (params) => {
  let docWidth = window.innerWidth;
    const $text = document.querySelectorAll(".jetbrains-cookies-banner__paragraph-btn-style SPAN");
    const deleteItem = (i) => {
      const arText = i.textContent.trim().split(""); //?
      const index = arText.indexOf("]"); 
      let item = arText.splice(index, 1); 
      return { arText: arText, item: item };
    };
    if (docWidth > 1000) {
      for (const i of $text) {
        let { arText, item } = deleteItem(i);
        arText.splice(0, 0, item);
        i.textContent = arText.join("");
      }
    } else {
      for (const i of $text) {
        let { arText, item } = deleteItem(i);
        arText.push(item);
        i.textContent = arText.join("");
      }
    }
  };

  redactionTxtButtonYesNo();
  window.addEventListener("resize", () => redactionTxtButtonYesNo());
  
  
  
