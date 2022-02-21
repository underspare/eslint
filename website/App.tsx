import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';

import { NAMESPACES, Namespace } from '../config';
import { RuleTable } from './components/RuleTable';
import { getLanguage, getQuery, newUrl, replaceUrl, defaultTo, t } from './utils';

//@ts-ignore
import quikStartMd from '../README.zh-CN.md';

const App: React.SFC = () => {
  const query = getQuery();
  const [namespace, setNamespace] = useState(defaultTo<Namespace>('quik-start', 'quik-start' as Namespace, NAMESPACES));
  const [hideOff, toggleHideOff] = useState(query.hideOff === '1');
  const language = getLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, []);

  const Header = (
    <header className='header'>
      <div className='header-container'>
        <a
          className='header-title'
          onClick={() => {
            setNamespace('quik-start' as Namespace);
            replaceUrl(newUrl({ query: { rule: 'quik-start' } }));
          }}
        >
          <svg className="eslint-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4179" width="200" height="200"><path d="M332.72493 412.535453l171.001167-98.72725a13.830826 13.830826 0 0 1 13.83424 0l171.007994 98.72725a13.841066 13.841066 0 0 1 6.915413 11.9808v197.4545a13.858133 13.858133 0 0 1-6.918826 11.980799l-171.004581 98.72725a13.830826 13.830826 0 0 1-13.83424 0l-171.001167-98.72725a13.841066 13.841066 0 0 1-6.915413-11.980799V424.516253a13.847893 13.847893 0 0 1 6.915413-11.9808" fill="#7986CB" p-id="4180"></path><path d="M955.265709 502.476783L750.950409 147.036155c-7.420586-12.8512-21.128533-22.330026-35.969705-22.330026H306.329624c-14.844586 0-28.555946 9.478826-35.976532 22.330026L66.037792 501.701957c-7.420586 12.854613-7.420586 29.081599 0 41.932798L270.353092 896.170637c7.420586 12.8512 21.131946 19.421866 35.976532 19.421866h408.65108c14.83776 0 28.552532-6.372693 35.969705-19.227306l204.3153-353.109322c7.427413-12.847786 7.427413-27.921066 0-40.768852m-169.181861 170.922661c0 5.2224-3.14368 10.059093-7.676586 12.673706l-260.249592 150.152529a14.80704 14.80704 0 0 1-14.725119 0l-260.450978-150.152529c-4.52608-2.614613-7.693653-7.44448-7.693653-12.673706v-300.30847c0-5.229226 3.119787-10.059093 7.649279-12.677119l260.242765-150.152529a14.779733 14.779733 0 0 1 14.71488 0l260.471458 150.152529c4.529493 2.618027 7.717546 7.447893 7.717546 12.677119z" fill="#3F51B5" p-id="4181"></path></svg>
          <span>Eslint 代码规范说明</span>
        </a>
        <nav className='header-nav'>
          {/* <a
            className='nav-item'
            onClick={() => {
              setNamespace('quik-start' as Namespace);
              replaceUrl(newUrl({ query: { rule: 'quik-start' } }));
            }}
          >
            {'快速上手'}
          </a> */}
          {NAMESPACES.map((namespace) => (
            <a
              className='nav-item'
              key={namespace}
              onClick={() => {
                setNamespace(namespace as Namespace);
                replaceUrl(newUrl({ query: { rule: namespace } }));
              }}
            >
              {namespace}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );

  const Banner = namespace.includes('quik-start')
    ? null
    : (
      <div className="container-fluid top-gap-big">
        <label>
          <input
            type="checkbox"
            checked={hideOff}
            onChange={(e) => {
              toggleHideOff(e.target.checked);
              replaceUrl(newUrl({ query: { hideOff: e.target.checked } }));
            }}
          />
          {t('隐藏已禁用的规则')}
        </label>
      </div>
    );

  const QuikStart = () => {
    return (
      <ReactMarkdown
        children={quikStartMd}
      />
    )
  }

  return namespace.includes('quik-start')
    ? (
      <>
        {Header}
        {Banner}
        {/* <>this si quik start</> */}
        <QuikStart />
      </>
    )
    : (
      <>
        {Header}
        {Banner}
        <RuleTable namespace={namespace} hideOff={hideOff} />
      </>
    );
};

export default App;
