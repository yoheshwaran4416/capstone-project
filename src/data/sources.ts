export interface SourceItem {
  id: string;
  category: string;
  canonicalTitle: string;
  publisher: string;
  versionOrDate: string;
  specificationUrl: string;
  coreRuleApplied: string;
  governingArticles: string[];
}

export const SOURCE_REGISTER: SourceItem[] = [
  {
    id: 'src-01',
    category: 'Network Protocol',
    canonicalTitle: 'RFC 9110: HTTP Semantics',
    publisher: 'Internet Engineering Task Force (IETF)',
    versionOrDate: 'June 2022',
    specificationUrl: 'https://www.rfc-editor.org/rfc/rfc9110',
    coreRuleApplied: 'Section 15.3.2: 201 Created MUST be returned when one or more resources have been created.',
    governingArticles: ['art-01', 'DEL-04', 'DEL-19']
  },
  {
    id: 'src-02',
    category: 'Programming Language',
    canonicalTitle: 'Python 3.14 Documentation & Language Reference',
    publisher: 'Python Software Foundation',
    versionOrDate: 'Python 3.14.2',
    specificationUrl: 'https://docs.python.org/3/',
    coreRuleApplied: 'Section 4.7: Function definitions, parameter binding order, LEGB variable scoping rules.',
    governingArticles: ['art-01', 'art-02', 'art-03']
  },
  {
    id: 'src-03',
    category: 'Style & Conventions',
    canonicalTitle: 'PEP 8: Style Guide for Python Code',
    publisher: 'Python Enhancement Proposals',
    versionOrDate: 'Active Standard',
    specificationUrl: 'https://peps.python.org/pep-0008/',
    coreRuleApplied: 'Programming Recommendations: Comparisons to singletons like None should always be done with "is" or "is not".',
    governingArticles: ['art-01', 'art-02']
  },
  {
    id: 'src-04',
    category: 'Testing Framework',
    canonicalTitle: 'unittest — Unit testing framework',
    publisher: 'Python Software Foundation',
    versionOrDate: 'Standard Library',
    specificationUrl: 'https://docs.python.org/3/library/unittest.html',
    coreRuleApplied: 'TestCase class lifecycle, test fixture isolation, setUp/tearDown execution semantics.',
    governingArticles: ['art-01', 'art-03']
  },
  {
    id: 'src-05',
    category: 'Application Framework',
    canonicalTitle: 'Flask 3.1 Documentation & Application Factories',
    publisher: 'Pallets Projects',
    versionOrDate: 'Flask 3.1.3',
    specificationUrl: 'https://flask.palletsprojects.com/',
    coreRuleApplied: 'Application Factory Pattern for isolated testing fixtures without shared global state.',
    governingArticles: ['DEL-04', 'DEL-19']
  },
  {
    id: 'src-06',
    category: 'Professional Ethics',
    canonicalTitle: 'ACM Code of Ethics and Professional Conduct',
    publisher: 'Association for Computing Machinery',
    versionOrDate: 'Adopted 2018',
    specificationUrl: 'https://www.acm.org/code-of-ethics',
    coreRuleApplied: 'Section 1.4: Be fair and take action not to discriminate; Section 2.5: Give comprehensive and thorough evaluations of computer systems.',
    governingArticles: ['DEL-17', 'About Page']
  }
];
