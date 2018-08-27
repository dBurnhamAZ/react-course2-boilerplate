// Higher Order Component (HOC) Component that renders another component
import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>The info is: {props.info}</p>
  </div>
);

const withAdminWarning = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAdmin && <p>This is private info, don't share</p>}
      <WrappedComponent {...props}/>
    </div>
  );
};

const requireAuthentication = (WrappedComponent) => {
  return (props) => (
    <div>
      {props.isAuthenticated ? (<WrappedComponent {...props} />) : (<p>Please Log-In to View</p>)}      
    </div>
    );
};

const AdminInfo = withAdminWarning(Info);

const AuthInfo = requireAuthentication(Info);


// /AdminInfo calls const AdminInfo, which calls withAdminWarning(Info), which calls Info = HOC)
//ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info="Here are the details!" />, document.getElementById('app'));
