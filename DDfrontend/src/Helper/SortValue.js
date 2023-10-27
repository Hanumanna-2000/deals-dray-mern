let sortingValue=(user)=>{
    let mapValue = user
      .map((m) => {
        return m.f_Name;
      })
      .sort();
    let obj = [];
    for (let j = 0; j < user.length; j++) {
      for (let i = 0; i < mapValue.length; i++) {
        if (mapValue[j] === user[i].f_Name) {
          obj.push(user[i]);
        }
      }
    }

    function removeDuplicates(obj) {
      return obj.filter((item, index) => obj.indexOf(item) === index);
    }
    console.log(removeDuplicates(obj));
    return removeDuplicates(obj)
  };

  let SortByEmail=(user)=>{
    let mapValue = user
      .map((m) => {
        return m.f_Email;
      })
      .sort();
    let obj = [];
    for (let j = 0; j < user.length; j++) {
      for (let i = 0; i < mapValue.length; i++) {
        if (mapValue[j] === user[i].f_Email) {
          obj.push(user[i]);
        }
      }
    }
    
    return obj
  }

  let sortByDate=(user)=>{
    let mapValue = user
      .map((m) => {
        return m.createdAt.toString().slice(0,10);
      })
      .sort();
    let obj = [];
    for (let j = 0; j < user.length; j++) {
      for (let i = 0; i < mapValue.length; i++) {
        if (mapValue[j] === user[i].createdAt.toString().slice(0,10)) {
          obj.push(user[i]);
        }
      }
    }
    function removeDuplicates(obj) {
      return obj.filter((item, index) => obj.indexOf(item) === index);
    }
    console.log(removeDuplicates(obj));
    return removeDuplicates(obj)
    
  }

  let sortByUniqueId=(user)=>{
    let mapValue = user
      .map((m) => {
        return m._id;
      })
      .sort();
    let obj = [];
    for (let j = 0; j < user.length; j++) {
      for (let i = 0; i < mapValue.length; i++) {
        if (mapValue[j] === user[i]._id) {
          obj.push(user[i]);
        }
      }
    }
    
    return obj
  }
  export {sortByUniqueId}
  export {sortByDate}
  export {SortByEmail}
  export {sortingValue}