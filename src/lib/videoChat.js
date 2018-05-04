const baseurl = "http://35.202.105.32:9099/";

const authHeader = (isGet = true) => (Object.assign({}, {
    'Accept': 'application/json',
// 'Authorization': 'Bearer ${authToken}'
}, isGet ? {} : {
    'Content-Type': 'application/json'
}));

async function runApiCall(func) {
    try {
      await func();
    } catch (err) {
      // console.log(err);
      //alert('Error', 'An error occured while processing your request!');
    }
}

const getSessionId = async (dispatch,callback) => {
    await runApiCall(async () => {
      const res = await fetch(baseurl + 'tokbox/session', {
        method: 'GET',
        headers: authHeader()
      });
      if (res.status === 200) {
        const body = await res.json();
        callback(body);
      } else {
          // alert("No Data");
          callback([]);
      }
    });
};

const getToken = async (dispatch, sessionid,callback) => {
    await runApiCall(async () => {
      const res = await fetch(baseurl + 'tokbox/token?sessionId='+sessionid, {
        method: 'GET',
        headers: authHeader()
      });
      if (res.status === 200) {
        const body = await res.json();
        callback(body);
      } else {
          // alert("No Data");
          callback([]);
      }
    });
};

export{
    getSessionId,
    getToken
}
