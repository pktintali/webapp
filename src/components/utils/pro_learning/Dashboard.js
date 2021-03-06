import React, { useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "react-toastify";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import firebase from "../../firebase";
toast.configure();
const Dashboard = () => {
  // const [result, setResult] = useState();
  const [loader, setLoader] = useState(false);
  const [topic, setTopic] = useState();
  const [subject, setSubject] = useState();
  const [unit, setUnit] = useState();
  const [mainIMG, setMainIMG] = useState();
  const [body, setBody] = useState();
  const [res1, setRes1] = useState();
  const [res2, setRes2] = useState();
  const [res3, setRes3] = useState();
  // const [content, setContent] = useState("");
  // const [menu, setMenu] = useState("Select Element ↆ");
  // const [c, setC] = useState([1]);

  var help = `h1.Heading h1.#green b.yellow
  #>h2.Heading h2
  #>h3.Heading h3.#b.blue
  #>h4.Heading h4
  #>h5.Heading h5
  #>p0.This is sample paragraph
  #>s0.new line space
  #>cb.checkBox point
  #>ob.circular box
  #>im.https://media.geeksforgeeks.org/wp-content/uploads/20190321145114/Untitled-Diagram-91.png
  #>hr.horizontal Line
  #>t0.Side1 of Difference|Side 2 of Difference
  #>tx.Firsts difference of part 1 hai ye | First Difference of part 2 hai ye
  #>tx.Second difference of part 1 hai ye | Second Difference of part 2 hai ye`;
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const customLoader = (
    <div>
      <h3>Adding...</h3>
      <center>
        <BarLoader height="8" width="150" color="green" />
      </center>
      <div className="c-box-min"></div>
    </div>
  );

  const clear = () => {
    setTopic("");
    setMainIMG("");
    setBody("");
    setRes1("");
    setRes2("");
    setRes3("");
  };

  const validate = () => {
    if (subject == undefined || subject == "") {
      toast.error("Error: Subject is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    }
    if (unit == undefined || unit == "") {
      toast.error("Error: Unit is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    }
    if (topic == undefined || topic == "") {
      toast.error("Error: Topic is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return false;
    }
    return true;
  };
  async function connectSheet() {
    setLoader(true);
    if (validate()) {
      const { GoogleSpreadsheet } = require("google-spreadsheet");
      // Initialize the sheet - doc ID is the long id in the sheets URL
      const doc = new GoogleSpreadsheet(
        "1KsMfIEpX5ZVTDZlbjDzJtbS5ILw0CmuiEF_gAqYDtao"
      );

      // Initialize Auth - see more available options at https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
      await doc.useServiceAccountAuth({
        client_email: "projectsheet@studentsmitra.iam.gserviceaccount.com",
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC+qZ5WL/Nbxs9x\nGJqK1ByQ5K66ksNeplw7LUgacsxE1DNG1RzCGynPJuq0wnUGC3LXM8dBBQCKrZcq\naw9iCLYvQyzC4A53po0Cu3/c0gP918ZRWqU50Ftv35eIC0eB6Eta7sQLTmg2avXv\n8goEbYL73RnBrfpjHy+LixebnKttbJTWWuNxlzYoU4S//+0IppEG4+GzwXKxyTcB\nT4IFVBD0CxAMTJ2zxyF0JHjWV7i/yW0trDV/TGnbKlKyqj6nk1jQlXmzFG2/j3SF\nofJn6tcy6LAbKWiFrjQeeVR45T1PwMp/t+e7bRtn7CXQfPD/CcRxAtSsbF2B1cFc\n/cP8OlPbAgMBAAECggEADVX/5TdlZj35tIdsB9neRaQ5NIOfdrdcLCd2q6Lr9sSA\n8atmX41W1055jDstxEZ4ueS9Qyb+arTJpgXnBYxmcdfZAah6WpQjuNU0lFV8Qf0d\nugMFG44fVyvkhXeEgOmmm62nuMK7N1Mz8JyVZsniJ4vHiWyJ3vUHdlM8S34h331h\nm4im3UsSaQZSsOci/7zr1w3yTWxfsE7YU2RyMLJxjnshtLSn+/SeSVEBff3bjtUI\nil91XKE/1x0TLMUqGO3ICsl55z3C11iKclAC3sfqAp/ewMElAIk9Hpe3y+2JS4GD\nDKyMRDitQYUAVzJ7TsiipsX2tkI4ce4AWf80hdc8AQKBgQD82w4rKott5kGeDcKU\nbALVZTc2XAy263FtF+eidS/w+a4nEm9YMOhV/rBPUaCAI0snk/ddRYKiYTIWV2Bz\nRyu9yYhYdO8JQBUEcQtW9J5Y7jv6rvO6SYOrwa6D1BIbxWHsCn/LZCteoM7B6B8K\nnKGWmdX5+T+FdQclB1qdIO+MmwKBgQDBCJOfX4Kj10AoajUWGxSQ91rVmQIvrIMX\nFAeBdC64uN9bW8x6pJFgy7hcgZ/nCXjyFlsO80agI+pCD8PThmMVaUGWQb0ttObn\nNYMbS2Fygqu8+6EH8TTweDjPi/RY4cfw4Hd/7Yrs6AzBfsVpN75TZwBRTicbuj26\ntw7oBt2pwQKBgQCQhliT3a5yM4Df6TeFhDMea8riHDz8NJjRZS91kQvE7cFX/dZ8\njv/NX1TBEYPumb20MoPZ4Qgo7esmD+1GFrDuuolfHf8ex2z76+0yV4FGjWzk/Si8\nGpbTDlJEcWukSe6Nbvbadze+z6U9+gH8G8jUfrtqNMfU7S4XQRvO4etp7wKBgCgf\nVj/MJGVVulosKTidDFtNbq3zDcdG/kBvw1efBI8UrihZHllnl2gdMAbaUpg9GcyH\n5Qloe4eRr4FnsXZn+nRa2m0W4PF9JnlsYAHuWyToEDZJvyDde/l3o6dQGcvXsi1Z\nGr2WbEftu6kEZpgGJCNFx4Uez3Yt8eK7ZffIZY6BAoGBAIcc6/Sr7hiy4DrbcBmD\n8S9gp9bb9rcQYbPYvLdH49MESW0HHR6kJIBekHnoqr28OUTmjIpDiHvREUXNGyGQ\nHbnnym6NG239jCtula9xOp0Ve/b+7YC2vO/hjdEzdVGqD1jdCHhGJDVLo1KNU00b\n06JmpQvePaxfJ13cnSTY94+Z\n-----END PRIVATE KEY-----\n",
      });

      await doc.loadInfo();
      console.log(doc.title);
      var sName = subject + "-" + unit;
      const headerRow = [
        "topic",
        "mainIMG",
        "body",
        "res1",
        "res2",
        "res3",
        "Author",
        "Date",
      ];

      try {
        var sheet = doc.sheetsByTitle[sName];
        if (sheet == undefined) {
          sheet = await doc.addSheet({ headerValues: headerRow });
          await sheet.updateProperties({
            title: sName,
          });
        }
        // sheet = await doc.addSheet({ headerValues: headerRow });
        // const sheet = doc.sheetsByTitle["Sheet1"];
        // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
        // await sheet.updateProperties({
        //   title: props.sub,
        // });
        console.log(sheet.title);
        console.log(sheet.rowCount);

        // const keys = Object.keys(result);
        // for (var i = 0; i < keys.length; i++) {
        //   const dataRow = [keys[i], result[keys[i]][0], result[keys[i]][1]];
        //   // console.log(dataRow);
        //   await sheet.addRow(dataRow);
        //   sleep(1500);
        // }
        const dataRow = [
          topic,
          mainIMG,
          body,
          res1,
          res2,
          res3,
          firebase.getCurrentUsername(),
        ];
        await sheet.addRow(dataRow);
        toast.success("Added Successfully", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        clear();
      } catch (e) {
        toast.error("Error: Something went wrong", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }
      // await sheet.setHeaderRow(row);
      // await sheet.addRow(row);
      // adding / removing sheets
      // const newSheet = await doc.addSheet({ title: "hot new sheet!" });
      // await newSheet.delete();
    }
    setLoader(false);
  }

  return (
    <>
      <div>
        <h2>Add a Topic on Pro Learning</h2>
        <form className="w3-container">
          <h3>Select Subject</h3>
          <p className="w3-padding">
            <label>SE </label>
            <input
              className="w3-radio pointer"
              type="radio"
              name="subject"
              value="se"
              onChange={(e) => setSubject(e.target.value)}
            />
            <span>{"----"}</span>
            <label>CN </label>
            <input
              className="w3-radio pointer"
              type="radio"
              name="subject"
              value="cn"
              onChange={(e) => setSubject(e.target.value)}
            />

            <span>{"----"}</span>
            <label>WT </label>
            <input
              className="w3-radio pointer"
              type="radio"
              name="subject"
              value="wt"
              onChange={(e) => setSubject(e.target.value)}
            />
            <span>{"----"}</span>
            <label>BD </label>
            <input
              className="w3-radio pointer"
              type="radio"
              name="subject"
              value="bd"
              onChange={(e) => setSubject(e.target.value)}
            />
            <span>{"----"}</span>
            <label>OOPS </label>
            <input
              className="w3-radio pointer"
              type="radio"
              name="subject"
              value="oops"
              onChange={(e) => setSubject(e.target.value)}
            />
            <span>{"----"}</span>
            <label>ITCS </label>
            <input
              className="w3-radio pointer"
              type="radio"
              name="subject"
              value="itcs"
              onChange={(e) => setSubject(e.target.value)}
            />
          </p>
          <h3>Select UNIT</h3>
          <p className="w3-padding">
            <label>1 </label>
            <input
              className="w3-radio pointer"
              type="radio"
              name="unit"
              value="1"
              onChange={(e) => setUnit(e.target.value)}
            />
            <span>{"----"}</span>
            <label>2 </label>
            <input
              className="w3-radio pointer"
              type="radio"
              name="unit"
              value="2"
              onChange={(e) => setUnit(e.target.value)}
            />
            <span>{"----"}</span>
            <label>3 </label>
            <input
              className="w3-radio pointer"
              type="radio"
              name="unit"
              value="3"
              onChange={(e) => setUnit(e.target.value)}
            />
            <span>{"----"}</span>
            <label>4 </label>
            <input
              className="w3-radio pointer"
              type="radio"
              name="unit"
              value="4"
              onChange={(e) => setUnit(e.target.value)}
            />
            <span>{"----"}</span>
            <label>5 </label>
            <input
              className="w3-radio pointer"
              type="radio"
              name="unit"
              value="5"
              onChange={(e) => setUnit(e.target.value)}
            />
          </p>
          <p>
            <lable>Topic Name</lable>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </p>
          <p>
            <lable>Image URL</lable>
            <input
              type="text"
              value={mainIMG}
              onChange={(e) => setMainIMG(e.target.value)}
            />
          </p>
          <p>Body Text</p>
          <p>
            <textarea
              type="text"
              rows="9"
              cols="70"
              placeholder={help}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </p>
          <p>
            <lable>Res 1</lable>
            <input
              type="text"
              value={res1}
              onChange={(e) => setRes1(e.target.value)}
            />
          </p>
          <p>
            <lable>Res 2</lable>
            <input
              type="text"
              value={res2}
              onChange={(e) => setRes2(e.target.value)}
            />
          </p>
          <p>
            <lable>Res 3</lable>
            <input
              type="text"
              value={res3}
              onChange={(e) => setRes3(e.target.value)}
            />
          </p>
        </form>
        {loader && customLoader}
        <div className="w3-container">
          <button
            onClick={connectSheet}
            className="w3-button w3-round w3-green"
          >
            ADD
          </button>
        </div>
        <div className="c-box-min"></div>
        <div className="w3-card-4 ">
          <table className="w3-table w3-bordered">
            <tbody>
              <tr>
                <th>Tag</th>
                <th>Description</th>
              </tr>
              <tr>
                <td>{"#>"}</td>
                <td>For Braking/Separating elements</td>
              </tr>
              <tr>
                <td>{"something."}</td>
                <td>Use at the starting of elements</td>
              </tr>

              <tr>
                <td>{"h1."}</td>
                <td>For Heading 1</td>
              </tr>
              <tr>
                <td>{"h2."}</td>
                <td>For Heading 2</td>
              </tr>
              <tr>
                <td>{"Similarly h3. h4. h5."}</td>
                <td>Heading 3,Heading 4,Heading 5</td>
              </tr>
              <tr>
                <td>{"p0."}</td>
                <td>For Normal paragraph</td>
              </tr>
              <tr>
                <td>{"s0."}</td>
                <td>For Single Line Break/Space</td>
              </tr>
              <tr>
                <td>{"cb."}</td>
                <td>For checkBox point</td>
              </tr>
              <tr>
                <td>{"ob."}</td>
                <td>For circle point</td>
              </tr>
              <tr>
                <td>{"im."}</td>
                <td>After this write image URL</td>
              </tr>
              <tr>
                <td>{"hr."}</td>
                <td>For Horizontal Line</td>
              </tr>
              <tr>
                <td>{"t0."}</td>
                <td>Header of Table [Left Side | Right Side]</td>
              </tr>
              <tr>
                <td>{"NOTE"}</td>
                <td>Don't Forgot | Between Two Sides of Table</td>
              </tr>
              <tr>
                <td>{"tx."}</td>
                <td>Row Of Table [Left Side | Right Side]</td>
              </tr>
              <tr>
                <td>{"tx."}</td>
                <td>Row Of Table [Left Side | Right Side]</td>
              </tr>
              <tr>
                <td>{".#something"}</td>
                <td>Use at the end of element </td>
              </tr>
              <tr>
                <td>{".#red"}</td>
                <td>For Making Text red Ex: h1.Heading.#red</td>
              </tr>
              <tr>
                <td>{".#green"}</td>
                <td>For Making Text green</td>
              </tr>
              <tr>
                <td>{".#yellow"}</td>
                <td>For Making Text yellow</td>
              </tr>
              <tr>
                <td>{".#blue"}</td>
                <td>For Making Text blue</td>
              </tr>
              <tr>
                <td>{".#purple"}</td>
                <td>For Making Text purple</td>
              </tr>
              <tr>
                <td>{".#b.color"}</td>
                <td> for background color of text</td>
              </tr>
              <tr>
                <td>{"h1.Something.#red b.yellow"}</td>
                <td>This will make red text and yellow background</td>
              </tr>
            </tbody>
          </table>
          <h2>A Good Example</h2>
          <SyntaxHighlighter
            language="dart"
            style={materialDark}
            showLineNumbers
          >
            {help}
          </SyntaxHighlighter>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
