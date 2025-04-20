// ==========================================================================================
// GENERATED USING typed-graphql-builder
// See: https://www.npmjs.com/package/typed-graphql-builder
//
// Modifications applied to final file:
// - export Selection type to make typesafe query wrappers possible
// - replace default JSON type with actual object type
// ==========================================================================================

import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { gql } from "graphql-tag";

/* eslint-disable */

const VariableName = " $1fcbcbff-3e78-462f-b45c-668a3e09bfd8";

const ScalarBrandingField = " $1fcbcbff-3e78-462f-b45c-668a3e09bfd9";

type CustomScalar<T> = { [ScalarBrandingField]: T };

class Variable<T, Name extends string> {
  private [VariableName]: Name;
  // @ts-ignore
  private _type?: T;

  // @ts-ignore
  constructor(
    name: Name,
    private readonly isRequired?: boolean
  ) {
    this[VariableName] = name;
  }
}

type ArrayInput<I> = [I] extends [$Atomic] ? never : ReadonlyArray<VariabledInput<I>>;

type AllowedInlineScalars<S> = S extends string | number ? S : never;

export type UnwrapCustomScalars<T> =
  T extends CustomScalar<infer S>
    ? S
    : T extends ReadonlyArray<infer I>
      ? ReadonlyArray<UnwrapCustomScalars<I>>
      : T extends Record<string, any>
        ? { [K in keyof T]: UnwrapCustomScalars<T[K]> }
        : T;

type VariableWithoutScalars<T, Str extends string> = Variable<UnwrapCustomScalars<T>, Str>;

// the array wrapper prevents distributive conditional types
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types
type VariabledInput<T> = [T] extends [CustomScalar<infer S> | null | undefined]
  ? // scalars only support variable input
    Variable<S | null | undefined, any> | AllowedInlineScalars<S> | null | undefined
  : [T] extends [CustomScalar<infer S>]
    ? Variable<S, any> | AllowedInlineScalars<S>
    : [T] extends [$Atomic]
      ? Variable<T, any> | T
      : T extends ReadonlyArray<infer I>
        ? VariableWithoutScalars<T, any> | T | ArrayInput<I>
        : T extends Record<string, any> | null | undefined
          ?
              | VariableWithoutScalars<T | null | undefined, any>
              | null
              | undefined
              | { [K in keyof T]: VariabledInput<T[K]> }
              | T
          : T extends Record<string, any>
            ? VariableWithoutScalars<T, any> | { [K in keyof T]: VariabledInput<T[K]> } | T
            : never;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

/**
 * Creates a new query variable
 *
 * @param name The variable name
 */
export const $ = <Type, Name extends string>(name: Name): Variable<Type, Name> => {
  return new Variable(name);
};

/**
 * Creates a new query variable. A value will be required even if the input is optional
 *
 * @param name The variable name
 */
export const $$ = <Type, Name extends string>(name: Name): Variable<NonNullable<Type>, Name> => {
  return new Variable(name, true);
};

type SelectOptions = {
  argTypes?: { [key: string]: string };
  args?: { [key: string]: any };
  selection?: Selection<any>;
};

class $Field<Name extends string, Type, Vars = {}> {
  public kind: "field" = "field";
  public type!: Type;

  public vars!: Vars;
  public alias: string | null = null;

  constructor(
    public name: Name,
    public options: SelectOptions
  ) {}

  as<Rename extends string>(alias: Rename): $Field<Rename, Type, Vars> {
    const f = new $Field(this.name, this.options);
    f.alias = alias;
    return f as any;
  }
}

class $Base<Name extends string> {
  // @ts-ignore
  constructor(private $$name: Name) {}

  protected $_select<Key extends string>(
    name: Key,
    options: SelectOptions = {}
  ): $Field<Key, any, any> {
    return new $Field(name, options);
  }
}

// @ts-ignore
class $Union<T, Name extends String> extends $Base<Name> {
  // @ts-ignore
  private $$type!: T;
  // @ts-ignore
  private $$name!: Name;

  constructor(
    private selectorClasses: { [K in keyof T]: { new (): T[K] } },
    $$name: Name
  ) {
    super($$name);
  }

  $on<Type extends keyof T, Sel extends Selection<T[Type]>>(
    alternative: Type,
    selectorFn: (selector: T[Type]) => [...Sel]
  ): $UnionSelection<GetOutput<Sel>, GetVariables<Sel>> {
    const selection = selectorFn(new this.selectorClasses[alternative]());

    return new $UnionSelection(alternative as string, selection);
  }
}

// @ts-ignore
class $Interface<T, Name extends string> extends $Base<Name> {
  // @ts-ignore
  private $$type!: T;
  // @ts-ignore
  private $$name!: Name;

  constructor(
    private selectorClasses: { [K in keyof T]: { new (): T[K] } },
    $$name: Name
  ) {
    super($$name);
  }
  $on<Type extends keyof T, Sel extends Selection<T[Type]>>(
    alternative: Type,
    selectorFn: (selector: T[Type]) => [...Sel]
  ): $UnionSelection<GetOutput<Sel>, GetVariables<Sel>> {
    const selection = selectorFn(new this.selectorClasses[alternative]());

    return new $UnionSelection(alternative as string, selection);
  }
}

class $UnionSelection<T, Vars> {
  public kind: "union" = "union";
  // @ts-ignore
  private vars!: Vars;
  constructor(
    public alternativeName: string,
    public alternativeSelection: Selection<T>
  ) {}
}

export type Selection<_any> = ReadonlyArray<$Field<any, any, any> | $UnionSelection<any, any>>;

type NeverNever<T> = [T] extends [never] ? {} : T;

type Simplify<T> = { [K in keyof T]: T[K] } & {};

type LeafType<T> = T extends CustomScalar<infer S> ? S : T;

export type GetOutput<X extends Selection<any>> = Simplify<
  UnionToIntersection<
    {
      [I in keyof X]: X[I] extends $Field<infer Name, infer Type, any>
        ? { [K in Name]: LeafType<Type> }
        : never;
    }[keyof X & number]
  > &
    NeverNever<
      {
        [I in keyof X]: X[I] extends $UnionSelection<infer Type, any> ? LeafType<Type> : never;
      }[keyof X & number]
    >
>;

type PossiblyOptionalVar<VName extends string, VType> = null extends VType
  ? { [key in VName]?: VType }
  : { [key in VName]: VType };

type ExtractInputVariables<Inputs> =
  Inputs extends Variable<infer VType, infer VName>
    ? PossiblyOptionalVar<VName, VType>
    : // Avoid generating an index signature for possibly undefined or null inputs.
      // The compiler incorrectly infers null or undefined, and we must force access the Inputs
      // type to convince the compiler its "never", while still retaining {} as the result
      // for null and undefined cases
      // Works around issue 79
      Inputs extends null | undefined
      ? { [K in keyof Inputs]: Inputs[K] }
      : Inputs extends $Atomic
        ? {}
        : Inputs extends any[] | readonly any[]
          ? UnionToIntersection<
              { [K in keyof Inputs]: ExtractInputVariables<Inputs[K]> }[keyof Inputs & number]
            >
          : UnionToIntersection<
              { [K in keyof Inputs]: ExtractInputVariables<Inputs[K]> }[keyof Inputs]
            >;

export type GetVariables<Sel extends Selection<any>, ExtraVars = {}> = UnionToIntersection<
  {
    [I in keyof Sel]: Sel[I] extends $Field<any, any, infer Vars>
      ? Vars
      : Sel[I] extends $UnionSelection<any, infer Vars>
        ? Vars
        : never;
  }[keyof Sel & number]
> &
  ExtractInputVariables<ExtraVars>;

type ArgVarType = {
  type: string;
  isRequired: boolean;
  array: {
    isRequired: boolean;
  } | null;
};

const arrRegex = /\[(.*?)\]/;

/**
 * Converts graphql string type to `ArgVarType`
 * @param input
 * @returns
 */
function getArgVarType(input: string): ArgVarType {
  const array = input.includes("[")
    ? {
        isRequired: input.endsWith("!"),
      }
    : null;

  const type = array ? arrRegex.exec(input)![1]! : input;
  const isRequired = type.endsWith("!");

  return {
    array,
    isRequired: isRequired,
    type: type.replace("!", ""),
  };
}

function fieldToQuery(prefix: string, field: $Field<any, any, any>) {
  const variables = new Map<string, { variable: Variable<any, any>; type: ArgVarType }>();

  function stringifyArgs(
    args: any,
    argTypes: { [key: string]: string },
    argVarType?: ArgVarType
  ): string {
    switch (typeof args) {
      case "string":
        const cleanType = argVarType!.type;
        if ($Enums.has(cleanType!)) return args;
        else return JSON.stringify(args);
      case "number":
      case "boolean":
        return JSON.stringify(args);
      default:
        if (args == null) return "null";
        if (VariableName in (args as any)) {
          if (!argVarType)
            throw new globalThis.Error("Cannot use variabe as sole unnamed field argument");
          const variable = args as Variable<any, any>;
          const argVarName = variable[VariableName];
          variables.set(argVarName, { type: argVarType, variable: variable });
          return "$" + argVarName;
        }
        if (Array.isArray(args))
          return "[" + args.map((arg) => stringifyArgs(arg, argTypes, argVarType)).join(",") + "]";
        const wrapped = (content: string) => (argVarType ? "{" + content + "}" : content);
        return wrapped(
          Array.from(Object.entries(args))
            .map(([key, val]) => {
              let argTypeForKey = argTypes[key];
              if (!argTypeForKey) {
                throw new globalThis.Error(`Argument type for ${key} not found`);
              }
              const cleanType = argTypeForKey.replace("[", "").replace("]", "").replace(/!/g, "");
              return (
                key +
                ":" +
                stringifyArgs(val, $InputTypes[cleanType]!, getArgVarType(argTypeForKey))
              );
            })
            .join(",")
        );
    }
  }

  function extractTextAndVars(field: $Field<any, any, any> | $UnionSelection<any, any>) {
    if (field.kind === "field") {
      let retVal = field.name;
      if (field.alias) retVal = field.alias + ":" + retVal;
      const args = field.options.args,
        argTypes = field.options.argTypes;
      if (args && Object.keys(args).length > 0) {
        retVal += "(" + stringifyArgs(args, argTypes!) + ")";
      }
      let sel = field.options.selection;
      if (sel) {
        retVal += "{";
        for (let subField of sel) {
          retVal += extractTextAndVars(subField);
        }
        retVal += "}";
      }
      return retVal + " ";
    } else if (field.kind === "union") {
      let retVal = "... on " + field.alternativeName + " {";
      for (let subField of field.alternativeSelection) {
        retVal += extractTextAndVars(subField);
      }
      retVal += "}";

      return retVal + " ";
    } else {
      throw new globalThis.Error("Uknown field kind");
    }
  }

  const queryRaw = extractTextAndVars(field)!;

  const queryBody = queryRaw.substring(queryRaw.indexOf("{"));

  const varList = Array.from(variables.entries());
  let ret = prefix;
  if (varList.length) {
    ret +=
      "(" +
      varList
        .map(([name, { type: kind, variable }]) => {
          let type = kind.array ? "[" : "";
          type += kind.type;
          if (kind.isRequired) type += "!";
          if (kind.array) type += kind.array.isRequired ? "]!" : "]";

          if (!type.endsWith("!") && (variable as any).isRequired === true) {
            type += "!";
          }

          return "$" + name + ":" + type;
        })
        .join(",") +
      ")";
  }
  ret += queryBody;

  return ret;
}

export type OutputTypeOf<T> =
  T extends $Interface<infer Subtypes, any>
    ? { [K in keyof Subtypes]: OutputTypeOf<Subtypes[K]> }[keyof Subtypes]
    : T extends $Union<infer Subtypes, any>
      ? { [K in keyof Subtypes]: OutputTypeOf<Subtypes[K]> }[keyof Subtypes]
      : T extends $Base<any>
        ? { [K in keyof T]?: OutputTypeOf<T[K]> | null }
        : [T] extends [$Field<any, infer FieldType, any>]
          ? FieldType
          : [T] extends [(selFn: (arg: infer Inner) => any) => any]
            ? OutputTypeOf<Inner>
            : [T] extends [(args: any, selFn: (arg: infer Inner) => any) => any]
              ? OutputTypeOf<Inner>
              : never;

export type QueryOutputType<T extends TypedDocumentNode<any>> =
  T extends TypedDocumentNode<infer Out> ? Out : never;

export type QueryInputType<T extends TypedDocumentNode<any>> =
  T extends TypedDocumentNode<any, infer In> ? In : never;

export function fragment<T, Sel extends Selection<T>>(
  GQLType: { new (): T },
  selectFn: (selector: T) => [...Sel]
) {
  return selectFn(new GQLType());
}

type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => infer R ? R : never;

// TS4.0+
type Push<T extends any[], V> = [...T, V];

// TS4.1+
type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N
  ? []
  : Push<TuplifyUnion<Exclude<T, L>>, L>;

type AllFieldProperties<I> = {
  [K in keyof I]: I[K] extends $Field<infer Name, infer Type, any>
    ? $Field<Name, Type, any>
    : never;
};

type ValueOf<T> = T[keyof T];

export type AllFields<T> = TuplifyUnion<ValueOf<AllFieldProperties<T>>>;

export function all<I extends $Base<any>>(instance: I) {
  const prototype = Object.getPrototypeOf(instance);
  const allFields = Object.getOwnPropertyNames(prototype)
    .map((k) => prototype[k])
    .filter((o) => o?.kind === "field")
    .map((o) => o?.name) as (keyof typeof instance)[];
  return allFields.map((fieldName) => instance?.[fieldName]) as any as AllFields<I>;
}

// We use a dummy conditional type that involves GenericType to defer the compiler's inference of
// any possible variables nested in this type. This addresses a problem where variables are
// inferred with type unknown
// @ts-ignore
type ExactArgNames<GenericType, Constraint> = GenericType extends never
  ? never
  : [Constraint] extends [$Atomic | CustomScalar<any>]
    ? GenericType
    : Constraint extends ReadonlyArray<infer InnerConstraint>
      ? GenericType extends ReadonlyArray<infer Inner>
        ? ReadonlyArray<ExactArgNames<Inner, InnerConstraint>>
        : GenericType
      : GenericType & {
          [Key in keyof GenericType]: Key extends keyof Constraint
            ? ExactArgNames<GenericType[Key], Constraint[Key]>
            : never;
        };

type $Atomic = number | string | boolean | null | undefined;

let $Enums = new Set<string>([]);

export class Query extends $Base<"Query"> {
  constructor() {
    super("Query");
  }

  /**
 * Returns a Coverable Issue by issueId.
===
The query below returns a Coverable Issue.
<pre>
{
    <b>getCoverableIssue</b> {
        issueId
        jira(fields: ["assignee", "reporter"])
        status {
            name
            description
            color
        }
    }
}
</pre>
===
===
The query below returns the Coverable Issue with issue id **12345**.
<pre>
{
    <b>getCoverableIssue</b>(issueId: "12345") {
        issueId
    }
}
</pre>
===
 */
  getCoverableIssue<
    Args extends VariabledInput<{
      issueId: string;
    }>,
    Sel extends Selection<CoverableIssue>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
      }
    >,
    selectorFn: (s: CoverableIssue) => [...Sel]
  ): $Field<"getCoverableIssue", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
      },
      args,

      selection: selectorFn(new CoverableIssue()),
    };
    return this.$_select("getCoverableIssue", options as any) as any;
  }

  /**
 * Returns multiple coverable issues by jql or issue ids.
===
The query below returns 10 coverable issues that match the provided jql.
<pre>
{
    <b>getCoverableIssues</b>(limit: 10) {
        total
        start
        limit
        results {
            issueId
            jira(fields: ["assignee", "reporter"])
            status {
                name
                description
                color
            }
        }
    }
}
</pre>
===
 */
  getCoverableIssues<
    Args extends VariabledInput<{
      jql?: string | null;
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<CoverableIssueResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        jql?: string | null;
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: CoverableIssueResults) => [...Sel]
  ): $Field<"getCoverableIssues", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        jql: "String",
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new CoverableIssueResults()),
    };
    return this.$_select("getCoverableIssues", options as any) as any;
  }

  /**
 * Returns a Dataset by its testIssueId.
===
The Query below returns a Dataset.
<pre>
{
    <b>getDataset</b>(testIssueId: "12345") {
        id
        parameters {
            name
            type
            listValues
        }
        rows {
          order
          Values
        }
    }
}
</pre>
===
 */
  getDataset<
    Args extends VariabledInput<{
      testIssueId: string;
      testExecIssueId?: string | null;
      testPlanIssueId?: string | null;
      callTestIssueId?: string | null;
    }>,
    Sel extends Selection<Dataset>,
  >(
    args: ExactArgNames<
      Args,
      {
        testIssueId: string;
        testExecIssueId?: string | null;
        testPlanIssueId?: string | null;
        callTestIssueId?: string | null;
      }
    >,
    selectorFn: (s: Dataset) => [...Sel]
  ): $Field<"getDataset", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        testIssueId: "String!",
        testExecIssueId: "String",
        testPlanIssueId: "String",
        callTestIssueId: "String",
      },
      args,

      selection: selectorFn(new Dataset()),
    };
    return this.$_select("getDataset", options as any) as any;
  }

  /**
 * Returns multiple Datasets based on optional filters.
===
The Query below demonstrates how to retrieve multiple Datasets, including their metadata, parameters
<pre>
{
    <b>getDatasets</b>(
        testIssueIds: ["30000", "40000"],
    )
      {
        id
        testIssueId
        testExecIssueId
        testPlanIssueId
        parameters {
            name
            type
            listValues
        }
        rows {
          order
          Values
        }
      }
}
</pre>
===
 */
  getDatasets<
    Args extends VariabledInput<{
      testIssueIds?: Readonly<Array<string | null>> | null;
      testExecIssueIds?: Readonly<Array<string | null>> | null;
      testPlanIssueIds?: Readonly<Array<string | null>> | null;
    }>,
    Sel extends Selection<Dataset>,
  >(
    args: ExactArgNames<
      Args,
      {
        testIssueIds?: Readonly<Array<string | null>> | null;
        testExecIssueIds?: Readonly<Array<string | null>> | null;
        testPlanIssueIds?: Readonly<Array<string | null>> | null;
      }
    >,
    selectorFn: (s: Dataset) => [...Sel]
  ): $Field<"getDatasets", Array<GetOutput<Sel> | null> | null, GetVariables<Sel, Args>>;
  getDatasets<Sel extends Selection<Dataset>>(
    selectorFn: (s: Dataset) => [...Sel]
  ): $Field<"getDatasets", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>>;
  getDatasets(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        testIssueIds: "[String]",
        testExecIssueIds: "[String]",
        testPlanIssueIds: "[String]",
      },
      args,

      selection: selectorFn(new Dataset()),
    };
    return this.$_select("getDatasets", options as any) as any;
  }

  /**
 * Returns a test (with the call test steps expanded) by issue id and version id.
===
The query below returns the test version 2 of the test with the id "12345".
<pre>
{
    <b>getExpandedTest</b>(issueId: "12345", testVersionId: "2") {
        issueId
        testType {
            name
            kind
        }
        steps {
            parentTestIssueId
            calledTestIssueId
            id
            data
            action
            result
            attachments {
                id
                filename
            }
        }
        warnings
    }
}
</pre>
===
 */
  getExpandedTest<
    Args extends VariabledInput<{
      issueId: string;
      versionId?: number | null;
    }>,
    Sel extends Selection<ExpandedTest>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        versionId?: number | null;
      }
    >,
    selectorFn: (s: ExpandedTest) => [...Sel]
  ): $Field<"getExpandedTest", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        versionId: "Int",
      },
      args,

      selection: selectorFn(new ExpandedTest()),
    };
    return this.$_select("getExpandedTest", options as any) as any;
  }

  /**
 * Returns multiple tests (with the call test steps expanded) by jql, issue ids, project id or test type.
===
The query below returns the first 100 tests.
<pre>
{
    <b>getExpandedTests</b>(limit: 100) {
        total
        start
        limit
        results {
            issueId
            testType {
                name
                kind
            }
            jira(fields: ["assignee", "reporter"])
            warnings
        }
    }
}
</pre>
===
===
The query below returns 10 tests that match the provided jql.
<pre>
{
    <b>getExpandedTests</b>(jql: "project = 'PC'", limit: 10) {
        total
        start
        limit
        results {
            issueId
            testType {
                name
                kind
            }
            steps {
                parentTestIssueId
                calledTestIssueId
                id
                data
                action
                result
                attachments {
                    id
                    filename
                }
                customfields {
                    id
                    value
                }
            }
            jira(fields: ["assignee", "reporter"])
            warnings
        }
    }
}
</pre>
<b>Note</b>: If the jql returns more than 100 issues an error will be returned asking the user to refine the jql search.
===
===
The query below returns the tests of each test version.
<pre>
{
    <b>getExpandedTests</b>(tests:[{ issueId:"12345", testVersionId: "1" }, { issueId:"54321", testVersionId: "2" }]) {
        total
        start
        limit
        results {
            issueId
            testType {
                name
                kind
            }
        }
    }
}
</pre>
===
 */
  getExpandedTests<
    Args extends VariabledInput<{
      jql?: string | null;
      issueIds?: Readonly<Array<string | null>> | null;
      tests?: Readonly<Array<TestWithVersionInput | null>> | null;
      projectId?: string | null;
      testType?: TestTypeInput | null;
      modifiedSince?: string | null;
      limit: number;
      start?: number | null;
      folder?: FolderSearchInput | null;
    }>,
    Sel extends Selection<ExpandedTestResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        jql?: string | null;
        issueIds?: Readonly<Array<string | null>> | null;
        tests?: Readonly<Array<TestWithVersionInput | null>> | null;
        projectId?: string | null;
        testType?: TestTypeInput | null;
        modifiedSince?: string | null;
        limit: number;
        start?: number | null;
        folder?: FolderSearchInput | null;
      }
    >,
    selectorFn: (s: ExpandedTestResults) => [...Sel]
  ): $Field<"getExpandedTests", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        jql: "String",
        issueIds: "[String]",
        tests: "[TestWithVersionInput]",
        projectId: "String",
        testType: "TestTypeInput",
        modifiedSince: "String",
        limit: "Int!",
        start: "Int",
        folder: "FolderSearchInput",
      },
      args,

      selection: selectorFn(new ExpandedTestResults()),
    };
    return this.$_select("getExpandedTests", options as any) as any;
  }

  /**
 * Returns the folder for the given projectId with the specified Path along with its child folders.
===
The query below returns the root folder and all its child folders.
<pre>
{
    <b>getFolder</b>(projectId: "10000", path: "/") {
        name
        path
        testsCount
        folders
    }
}
</pre>
===
===
The query below returns the folder with path "/generic" and all its child folders.
<pre>
{
    <b>getFolder</b>(projectId: "10000", path: "/generic") {
        name
        path
        testsCount
        folders
    }
}
</pre>
===
 */
  getFolder<
    Args extends VariabledInput<{
      projectId?: string | null;
      testPlanId?: string | null;
      path: string;
    }>,
    Sel extends Selection<FolderResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        projectId?: string | null;
        testPlanId?: string | null;
        path: string;
      }
    >,
    selectorFn: (s: FolderResults) => [...Sel]
  ): $Field<"getFolder", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        projectId: "String",
        testPlanId: "String",
        path: "String!",
      },
      args,

      selection: selectorFn(new FolderResults()),
    };
    return this.$_select("getFolder", options as any) as any;
  }

  /**
 * Returns the Issue Link Types
===
The Query below returns all Issue Link Types
<pre>
{
    <b>getIssueLinkTypes</b> {
        issueLinks {
            id
            name
        }
    }
}
</pre>
===
 */
  getIssueLinkTypes<Sel extends Selection<IssueLinkType>>(
    selectorFn: (s: IssueLinkType) => [...Sel]
  ): $Field<"getIssueLinkTypes", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new IssueLinkType()),
    };
    return this.$_select("getIssueLinkTypes", options as any) as any;
  }

  /**
 * Returns a Precondition by issue id.
===
The Query below returns a Precondition.
<pre>
{
    <b>getPrecondition</b> {
        issueId
        preconditionType {
            kind
            name
        }
    }
}
</pre>
===
===
The Query below returns the Precondition with issue id **12345**
<pre>
{
    <b>getPrecondition</b>(issueId: "12345") {
        issueId
        definition
        jira(fields: ["assignee", "reporter"])
    }
}
</pre>
===
 */
  getPrecondition<
    Args extends VariabledInput<{
      issueId?: string | null;
    }>,
    Sel extends Selection<Precondition>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId?: string | null;
      }
    >,
    selectorFn: (s: Precondition) => [...Sel]
  ): $Field<"getPrecondition", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  getPrecondition<Sel extends Selection<Precondition>>(
    selectorFn: (s: Precondition) => [...Sel]
  ): $Field<"getPrecondition", GetOutput<Sel> | null, GetVariables<Sel>>;
  getPrecondition(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        issueId: "String",
      },
      args,

      selection: selectorFn(new Precondition()),
    };
    return this.$_select("getPrecondition", options as any) as any;
  }

  /**
 * Returns multiple Preconditions by jql, issueIds, projectId or Precondition Type.
===
The Query below returns the first 100 Preconditions.
<pre>
{
    <b>getPreconditions</b>(limit: 100) {
        total
        start
        limit
        results {
            issueId
            preconditionType {
                name
                kind
            }
            definition
            jira(fields: ["assignee", "reporter"])
        }
    }
}
</pre>
===
===
The Query below returns 10 Preconditions that match the provided jql
<pre>
{
    <b>getPreconditions</b>(jql: "project = 'PC'", limit: 10) {
        results {
            issueId
            preconditionType {
                name
                kind
            }
            jira(fields: ["assignee", "reporter"])
        }
    }
}
</pre>
<b>Note</b>: If the jql returns more than 100 issues an error will be returned asking the user to refine the jql search.
===
 */
  getPreconditions<
    Args extends VariabledInput<{
      jql?: string | null;
      issueIds?: Readonly<Array<string | null>> | null;
      projectId?: string | null;
      preconditionType?: TestTypeInput | null;
      limit: number;
      start?: number | null;
      modifiedSince?: string | null;
      folder?: PreconditionFolderSearchInput | null;
    }>,
    Sel extends Selection<PreconditionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        jql?: string | null;
        issueIds?: Readonly<Array<string | null>> | null;
        projectId?: string | null;
        preconditionType?: TestTypeInput | null;
        limit: number;
        start?: number | null;
        modifiedSince?: string | null;
        folder?: PreconditionFolderSearchInput | null;
      }
    >,
    selectorFn: (s: PreconditionResults) => [...Sel]
  ): $Field<"getPreconditions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        jql: "String",
        issueIds: "[String]",
        projectId: "String",
        preconditionType: "TestTypeInput",
        limit: "Int!",
        start: "Int",
        modifiedSince: "String",
        folder: "PreconditionFolderSearchInput",
      },
      args,

      selection: selectorFn(new PreconditionResults()),
    };
    return this.$_select("getPreconditions", options as any) as any;
  }

  /**
 * Returns the Project Settings of a Project.
===
The Query below returns multiple Status
<pre>
{
    <b>getProjectSettings</b> ( projectIdOrKey: "10000" ) {
        projectId,
        testEnvironments,
        testCoverageSettings {
            coverableIssueTypeIds
            epicIssuesRelation
            issueSubTasksRelation
            issueLinkTypeId
            issueLinkTypeDirection
        }
        defectIssueTypes
        testTypeSettings {
            testTypes {
                id
                name
                kind
            }
            defaultTestTypeId
        }
    }
}
</pre>
===
 */
  getProjectSettings<
    Args extends VariabledInput<{
      projectIdOrKey?: string | null;
    }>,
    Sel extends Selection<ProjectSettings>,
  >(
    args: ExactArgNames<
      Args,
      {
        projectIdOrKey?: string | null;
      }
    >,
    selectorFn: (s: ProjectSettings) => [...Sel]
  ): $Field<"getProjectSettings", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  getProjectSettings<Sel extends Selection<ProjectSettings>>(
    selectorFn: (s: ProjectSettings) => [...Sel]
  ): $Field<"getProjectSettings", GetOutput<Sel> | null, GetVariables<Sel>>;
  getProjectSettings(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        projectIdOrKey: "String",
      },
      args,

      selection: selectorFn(new ProjectSettings()),
    };
    return this.$_select("getProjectSettings", options as any) as any;
  }

  /**
 * Returns a Status by Test Run Status name.
===
The Query below returns a Status
<pre>
{
    <b>getStatus</b>( name: "PASSED") {
        name
        description
        final
        color
    }
}
</pre>
===
 */
  getStatus<
    Args extends VariabledInput<{
      name?: string | null;
    }>,
    Sel extends Selection<Status>,
  >(
    args: ExactArgNames<
      Args,
      {
        name?: string | null;
      }
    >,
    selectorFn: (s: Status) => [...Sel]
  ): $Field<"getStatus", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  getStatus<Sel extends Selection<Status>>(
    selectorFn: (s: Status) => [...Sel]
  ): $Field<"getStatus", GetOutput<Sel> | null, GetVariables<Sel>>;
  getStatus(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        name: "String",
      },
      args,

      selection: selectorFn(new Status()),
    };
    return this.$_select("getStatus", options as any) as any;
  }

  /**
 * Returns all Test Run Status.
===
The Query below returns multiple Status
<pre>
{
    <b>getStatuses</b> {
        name
        description
        final
        color
    }
}
</pre>
===
 */
  getStatuses<Sel extends Selection<Status>>(
    selectorFn: (s: Status) => [...Sel]
  ): $Field<"getStatuses", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Status()),
    };
    return this.$_select("getStatuses", options as any) as any;
  }

  /**
 * Returns a Status by Test Run Step Status name.
===
The Query below returns a Status
<pre>
{
    <b>getStepStatus</b>( name: "PASSED") {
        name
        description
        color
    }
}
</pre>
===
 */
  getStepStatus<
    Args extends VariabledInput<{
      name?: string | null;
    }>,
    Sel extends Selection<StepStatus>,
  >(
    args: ExactArgNames<
      Args,
      {
        name?: string | null;
      }
    >,
    selectorFn: (s: StepStatus) => [...Sel]
  ): $Field<"getStepStatus", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  getStepStatus<Sel extends Selection<StepStatus>>(
    selectorFn: (s: StepStatus) => [...Sel]
  ): $Field<"getStepStatus", GetOutput<Sel> | null, GetVariables<Sel>>;
  getStepStatus(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        name: "String",
      },
      args,

      selection: selectorFn(new StepStatus()),
    };
    return this.$_select("getStepStatus", options as any) as any;
  }

  /**
 * Returns all Test Run Step Status.
===
The Query below returns multiple Status
<pre>
{
    <b>getStepStatuses</b> {
        name
        description
        color
    }
}
</pre>
===
 */
  getStepStatuses<Sel extends Selection<StepStatus>>(
    selectorFn: (s: StepStatus) => [...Sel]
  ): $Field<"getStepStatuses", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new StepStatus()),
    };
    return this.$_select("getStepStatuses", options as any) as any;
  }

  /**
 * Returns a Test by issueId.
===
The query below returns a Test.
<pre>
{
    <b>getTest</b> {
        issueId
        gherkin
        jira(fields: ["assignee", "reporter"])
    }
}
</pre>
===
===
The query below returns the Test with issue id **12345**.
<pre>
{
    <b>getTest</b>(issueId: "12345") {
        issueId
        testType {
            name
            kind
        }
        steps {
            id
            data
            action
            result
            attachments {
                id
                filename
            }
        }
    }
}
</pre>
===
 */
  getTest<
    Args extends VariabledInput<{
      issueId?: string | null;
    }>,
    Sel extends Selection<Test>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId?: string | null;
      }
    >,
    selectorFn: (s: Test) => [...Sel]
  ): $Field<"getTest", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  getTest<Sel extends Selection<Test>>(
    selectorFn: (s: Test) => [...Sel]
  ): $Field<"getTest", GetOutput<Sel> | null, GetVariables<Sel>>;
  getTest(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        issueId: "String",
      },
      args,

      selection: selectorFn(new Test()),
    };
    return this.$_select("getTest", options as any) as any;
  }

  /**
 * Returns a Test Execution by issue id.
===
The Query below returns a Test Execution.
<pre>
{
    <b>getTestExecution</b> {
        issueId
        projectId
        jira(fields: ["assignee", "reporter"])
    }
}
</pre>
===
===
The Query below returns the Test Execution with issue id **12345**.
<pre>
{
    <b>getTestExecution</b>(issueId: "12345") {
        issueId
        tests(limit: 100) {
            total
            start
            limit
            results {
                issueId
                testType {
                    name
                }
            }
        }
    }
}
</pre>
===
 */
  getTestExecution<
    Args extends VariabledInput<{
      issueId?: string | null;
    }>,
    Sel extends Selection<TestExecution>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId?: string | null;
      }
    >,
    selectorFn: (s: TestExecution) => [...Sel]
  ): $Field<"getTestExecution", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  getTestExecution<Sel extends Selection<TestExecution>>(
    selectorFn: (s: TestExecution) => [...Sel]
  ): $Field<"getTestExecution", GetOutput<Sel> | null, GetVariables<Sel>>;
  getTestExecution(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        issueId: "String",
      },
      args,

      selection: selectorFn(new TestExecution()),
    };
    return this.$_select("getTestExecution", options as any) as any;
  }

  /**
 * Returns multiple Test Executions by jql, issue ids or project id.
===
The Query below returns the first 100 Test Executions
<pre>
{
    <b>getTestExecutions</b>(limit: 100) {
        total
        start
        limit
        results {
            issueId
            jira(fields: ["assignee", "reporter"])
        }
    }
}
</pre>
===
===
The Query below returns 10 Test Executions that match the provided jql.
<pre>
{
    <b>getTestExecutions</b>(jql: "project = 'PC'", limit: 10) {
        total
        start
        limit
        results {
            issueId
            tests(limit: 10) {
                total
                start
                limit
                results {
                    issueId
                    testType {
                        name
                    }
                }
            }
            jira(fields: ["assignee", "reporter"])
        }
    }
}
</pre>
<b>Note</b>: If the jql returns more than 100 issues an error will be returned asking the user to refine the jql search.
===
 */
  getTestExecutions<
    Args extends VariabledInput<{
      jql?: string | null;
      issueIds?: Readonly<Array<string | null>> | null;
      projectId?: string | null;
      limit: number;
      start?: number | null;
      modifiedSince?: string | null;
    }>,
    Sel extends Selection<TestExecutionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        jql?: string | null;
        issueIds?: Readonly<Array<string | null>> | null;
        projectId?: string | null;
        limit: number;
        start?: number | null;
        modifiedSince?: string | null;
      }
    >,
    selectorFn: (s: TestExecutionResults) => [...Sel]
  ): $Field<"getTestExecutions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        jql: "String",
        issueIds: "[String]",
        projectId: "String",
        limit: "Int!",
        start: "Int",
        modifiedSince: "String",
      },
      args,

      selection: selectorFn(new TestExecutionResults()),
    };
    return this.$_select("getTestExecutions", options as any) as any;
  }

  /**
 * Returns a Test Plan by issue id.
===
The Query below returns a Test Plan.
<pre>
{
    <b>getTestPlan</b> {
        issueId
        projectId
        jira(fields: ["assignee", "reporter"])
    }
}
</pre>
===
===
The Query below returns the Test Plan with issue id **12345**
<pre>
{
    <b>getTestPlan</b>(issueId: "12345") {
        issueId
        tests(limit: 100) {
            results {
                issueId
                testType {
                    name
                }
            }
        }
    }
}
</pre>
===
 */
  getTestPlan<
    Args extends VariabledInput<{
      issueId?: string | null;
    }>,
    Sel extends Selection<TestPlan>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId?: string | null;
      }
    >,
    selectorFn: (s: TestPlan) => [...Sel]
  ): $Field<"getTestPlan", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  getTestPlan<Sel extends Selection<TestPlan>>(
    selectorFn: (s: TestPlan) => [...Sel]
  ): $Field<"getTestPlan", GetOutput<Sel> | null, GetVariables<Sel>>;
  getTestPlan(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        issueId: "String",
      },
      args,

      selection: selectorFn(new TestPlan()),
    };
    return this.$_select("getTestPlan", options as any) as any;
  }

  /**
 * Returns multiple Test Plans by jql, issue ids or project id.
===
The Query below returns the first 100 Test Plans
<pre>
{
    <b>getTestPlans</b>(limit: 100) {
        total
        start
        limit
        results {
            issueId
            jira(fields: ["assignee", "reporter"])
        }
    }
}
</pre>
===
===
The Query below returns 10 Test Plans that match the provided jql.
<pre>
{
    <b>getTestPlans</b>(jql: "project = 'PC'", limit: 10) {
        total
        start
        limit
        results {
            issueId
            tests(limit: 10) {
                total
                start
                limit
                results {
                    issueId
                    testType {
                        name
                    }
                }
            }
            jira(fields: ["assignee", "reporter"])
        }
    }
}
</pre>
<b>Note</b>: If the jql returns more than 100 issues an error will be returned asking the user to refine the jql search.
===
 */
  getTestPlans<
    Args extends VariabledInput<{
      jql?: string | null;
      issueIds?: Readonly<Array<string | null>> | null;
      projectId?: string | null;
      limit: number;
      start?: number | null;
      modifiedSince?: string | null;
    }>,
    Sel extends Selection<TestPlanResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        jql?: string | null;
        issueIds?: Readonly<Array<string | null>> | null;
        projectId?: string | null;
        limit: number;
        start?: number | null;
        modifiedSince?: string | null;
      }
    >,
    selectorFn: (s: TestPlanResults) => [...Sel]
  ): $Field<"getTestPlans", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        jql: "String",
        issueIds: "[String]",
        projectId: "String",
        limit: "Int!",
        start: "Int",
        modifiedSince: "String",
      },
      args,

      selection: selectorFn(new TestPlanResults()),
    };
    return this.$_select("getTestPlans", options as any) as any;
  }

  /**
 * Returns a Test Run by Test issue id and Test Execution issue id.
===
The Query below returns a Test Run
<pre>
{
    <b>getTestRun</b>( testIssueId: "11165", testExecIssueId: "11164") {
        id
        status {
            name
            color
            description
        }
        gherkin
        examples {
            id
            status {
                name
                color
                description
            }
        }
    }
}
</pre>
===
 */
  getTestRun<
    Args extends VariabledInput<{
      testIssueId?: string | null;
      testExecIssueId?: string | null;
    }>,
    Sel extends Selection<TestRun>,
  >(
    args: ExactArgNames<
      Args,
      {
        testIssueId?: string | null;
        testExecIssueId?: string | null;
      }
    >,
    selectorFn: (s: TestRun) => [...Sel]
  ): $Field<"getTestRun", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  getTestRun<Sel extends Selection<TestRun>>(
    selectorFn: (s: TestRun) => [...Sel]
  ): $Field<"getTestRun", GetOutput<Sel> | null, GetVariables<Sel>>;
  getTestRun(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        testIssueId: "String",
        testExecIssueId: "String",
      },
      args,

      selection: selectorFn(new TestRun()),
    };
    return this.$_select("getTestRun", options as any) as any;
  }

  /**
 * Returns a Test Run by id.
===
The Query below returns a Test Run.
<pre>
{
    <b>getTestRunById</b>( id: "5acc7ab0a3fe1b6fcdc3c737") {
        id
        status {
            name
            color
            description
        }
        steps {
            action
            data
            result
            attachments {
                id
                filename
            }
            status {
                name
                color
            }
        }
    }
}
</pre>
===
 */
  getTestRunById<
    Args extends VariabledInput<{
      id?: string | null;
    }>,
    Sel extends Selection<TestRun>,
  >(
    args: ExactArgNames<
      Args,
      {
        id?: string | null;
      }
    >,
    selectorFn: (s: TestRun) => [...Sel]
  ): $Field<"getTestRunById", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  getTestRunById<Sel extends Selection<TestRun>>(
    selectorFn: (s: TestRun) => [...Sel]
  ): $Field<"getTestRunById", GetOutput<Sel> | null, GetVariables<Sel>>;
  getTestRunById(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        id: "String",
      },
      args,

      selection: selectorFn(new TestRun()),
    };
    return this.$_select("getTestRunById", options as any) as any;
  }

  /**
 * Returns multiple Test Runs testIssueIds and/or testExecIssueIds.
===
The query below returns the first 100 Test Runs that match the given testIssueIds and testExecIssueIds.
<pre>
{
    <b>getTestRuns</b>( testIssueIds: ["10001", "10002"], testExecIssueIds: ["10001", "10002"], limit: 100 ) {
        total
        limit
        start
        results {
            id
            status {
                name
                color
                description
            }
            gherkin
            examples {
                id
                status {
                name
                color
                description
                }
            }
            test {
                issueId
            }
            testExecution {
                issueId
            }
        }
    }
}
</pre>
=== ===
The query below returns the first 100 Test Runs that match the given ids.
<pre>
{
    <b>getTestRuns</b>( testIssueIds: ["12345"], limit: 100 ) {
        total
        limit
        start
        results {
            id
            status {
                name
                color
                description
            }
            steps {
                action
                data
                result
                attachments {
                    id
                    filename
                }
                status {
                    name
                    color
                }
            }
            test {
                issueId
            }
            testExecution {
                issueId
            }
        }
    }
}
</pre>
===
 */
  getTestRuns<
    Args extends VariabledInput<{
      testIssueIds?: Readonly<Array<string | null>> | null;
      testExecIssueIds?: Readonly<Array<string | null>> | null;
      testRunAssignees?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
      modifiedSince?: string | null;
    }>,
    Sel extends Selection<TestRunResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        testIssueIds?: Readonly<Array<string | null>> | null;
        testExecIssueIds?: Readonly<Array<string | null>> | null;
        testRunAssignees?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
        modifiedSince?: string | null;
      }
    >,
    selectorFn: (s: TestRunResults) => [...Sel]
  ): $Field<"getTestRuns", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        testIssueIds: "[String]",
        testExecIssueIds: "[String]",
        testRunAssignees: "[String]",
        limit: "Int!",
        start: "Int",
        modifiedSince: "String",
      },
      args,

      selection: selectorFn(new TestRunResults()),
    };
    return this.$_select("getTestRuns", options as any) as any;
  }

  /**
 * Returns multiple Test Runs by id.
===
The query below returns the first 100 Test Runs that match the given ids.
<pre>
{
    <b>getTestRunsById</b>( ids: ["5acc7ab0a3fe1b6fcdc3c737"], limit: 10 ) {
        total
        limit
        start
        results {
            id
            status {
                name
                color
                description
            }
            gherkin
            examples {
                id
                status {
                    name
                    color
                    description
                }
            }
            test {
                issueId
            }
            testExecution {
                issueId
            }
        }
    }
}
</pre>
===
 */
  getTestRunsById<
    Args extends VariabledInput<{
      ids?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestRunResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        ids?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestRunResults) => [...Sel]
  ): $Field<"getTestRunsById", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        ids: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestRunResults()),
    };
    return this.$_select("getTestRunsById", options as any) as any;
  }

  /**
 * Returns a Test Set by issueId
===
The query below returns a test set
<pre>
{
    <b>getTestSet</b> {
        issueId
        projectId
        jira(fields: ["assignee", "reporter"])
    }
}
</pre>
===
===
The query below returns the test set with issue id **12345**
<pre>
{
    <b>getTestSet</b>(issueId: "12345") {
        issueId
        tests(limit: 100) {
            results {
                issueId
                testType {
                    name
                }
            }
        }
    }
}
</pre>
===
 */
  getTestSet<
    Args extends VariabledInput<{
      issueId?: string | null;
    }>,
    Sel extends Selection<TestSet>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId?: string | null;
      }
    >,
    selectorFn: (s: TestSet) => [...Sel]
  ): $Field<"getTestSet", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  getTestSet<Sel extends Selection<TestSet>>(
    selectorFn: (s: TestSet) => [...Sel]
  ): $Field<"getTestSet", GetOutput<Sel> | null, GetVariables<Sel>>;
  getTestSet(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        issueId: "String",
      },
      args,

      selection: selectorFn(new TestSet()),
    };
    return this.$_select("getTestSet", options as any) as any;
  }

  /**
 * Returns multiple Test Sets by jql, issueIds or projectId.
===
The query below returns the first 100 Test Sets.
<pre>
{
    <b>getTestSets</b>(limit: 100) {
        total
        start
        limit
        results {
            issueId
            jira(fields: ["assignee", "reporter"])
        }
    }
}
</pre>
===
===
The query below returns 10 Test Sets that match the provided jql.
<pre>
{
    <b>getTestSets</b>(jql: "project = 'PC'", limit: 10) {
        total
        start
        limit
        results {
            issueId
            tests(limit: 10) {
                results {
                    issueId
                    testType {
                        name
                    }
                }
            }
            jira(fields: ["assignee", "reporter"])
        }
    }
}
</pre>
<b>Note</b>: If the jql returns more than 100 issues an error will be returned asking the user to refine the jql search.
===
 */
  getTestSets<
    Args extends VariabledInput<{
      jql?: string | null;
      issueIds?: Readonly<Array<string | null>> | null;
      projectId?: string | null;
      limit: number;
      start?: number | null;
      modifiedSince?: string | null;
    }>,
    Sel extends Selection<TestSetResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        jql?: string | null;
        issueIds?: Readonly<Array<string | null>> | null;
        projectId?: string | null;
        limit: number;
        start?: number | null;
        modifiedSince?: string | null;
      }
    >,
    selectorFn: (s: TestSetResults) => [...Sel]
  ): $Field<"getTestSets", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        jql: "String",
        issueIds: "[String]",
        projectId: "String",
        limit: "Int!",
        start: "Int",
        modifiedSince: "String",
      },
      args,

      selection: selectorFn(new TestSetResults()),
    };
    return this.$_select("getTestSets", options as any) as any;
  }

  /**
 * Returns multiple tests by jql, issue ids, project id or test type.
===
The query below returns the first 100 tests.
<pre>
{
    <b>getTests</b>(limit: 100) {
        total
        start
        limit
        results {
            issueId
            testType {
                name
                kind
            }
            jira(fields: ["assignee", "reporter"])
        }
    }
}
</pre>
===
===
The query below returns 10 tests that match the provided jql.
<pre>
{
    <b>getTests</b>(jql: "project = 'PC'", limit: 10) {
        total
        start
        limit
        results {
            issueId
            testType {
                name
                kind
            }
            steps {
                id
                data
                action
                result
                attachments {
                    id
                    filename
                }
                customfields {
                    id
                    value
                }
            }
            jira(fields: ["assignee", "reporter"])
        }
    }
}
</pre>
<b>Note</b>: If the jql returns more than 100 issues an error will be returned asking the user to refine the jql search.
===
 */
  getTests<
    Args extends VariabledInput<{
      jql?: string | null;
      issueIds?: Readonly<Array<string | null>> | null;
      projectId?: string | null;
      testType?: TestTypeInput | null;
      modifiedSince?: string | null;
      limit: number;
      start?: number | null;
      folder?: FolderSearchInput | null;
    }>,
    Sel extends Selection<TestResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        jql?: string | null;
        issueIds?: Readonly<Array<string | null>> | null;
        projectId?: string | null;
        testType?: TestTypeInput | null;
        modifiedSince?: string | null;
        limit: number;
        start?: number | null;
        folder?: FolderSearchInput | null;
      }
    >,
    selectorFn: (s: TestResults) => [...Sel]
  ): $Field<"getTests", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        jql: "String",
        issueIds: "[String]",
        projectId: "String",
        testType: "TestTypeInput",
        modifiedSince: "String",
        limit: "Int!",
        start: "Int",
        folder: "FolderSearchInput",
      },
      args,

      selection: selectorFn(new TestResults()),
    };
    return this.$_select("getTests", options as any) as any;
  }
}

export class FolderResults extends $Base<"FolderResults"> {
  constructor() {
    super("FolderResults");
  }

  /**
   * Folder children
   */
  get folders(): $Field<"folders", JSON | null> {
    return this.$_select("folders") as any;
  }

  /**
   * Folder issues count
   */
  get issuesCount(): $Field<"issuesCount", number | null> {
    return this.$_select("issuesCount") as any;
  }

  /**
   * Folder name
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  /**
   * Folder path
   */
  get path(): $Field<"path", string | null> {
    return this.$_select("path") as any;
  }

  /**
   * Folder preconditions count
   */
  get preconditionsCount(): $Field<"preconditionsCount", number | null> {
    return this.$_select("preconditionsCount") as any;
  }

  /**
   * Folder tests count
   */
  get testsCount(): $Field<"testsCount", number | null> {
    return this.$_select("testsCount") as any;
  }
}

/**
 * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
 */
export type JSON = Record<string, any>;

/**
 * Dataset type
Represents a single Dataset entity with its metadata, parameters, and associated dataset rows.
 */
export class Dataset extends $Base<"Dataset"> {
  constructor() {
    super("Dataset");
  }

  /**
   * The ID of the call test issue (only for test step datasets).
   */
  get callTestIssueId(): $Field<"callTestIssueId", string | null> {
    return this.$_select("callTestIssueId") as any;
  }

  /**
   * Unique identifier of the Dataset.
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * Parameters of the Dataset, represented as an array of key-value pairs.
   */
  parameters<Sel extends Selection<Parameter>>(
    selectorFn: (s: Parameter) => [...Sel]
  ): $Field<"parameters", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Parameter()),
    };
    return this.$_select("parameters", options as any) as any;
  }

  /**
   * The rows of the Dataset, representing combinatorial data.
   */
  rows<Sel extends Selection<DatasetRow>>(
    selectorFn: (s: DatasetRow) => [...Sel]
  ): $Field<"rows", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new DatasetRow()),
    };
    return this.$_select("rows", options as any) as any;
  }

  /**
   * The ID of the test execution issue associated with the Dataset.
   */
  get testExecIssueId(): $Field<"testExecIssueId", string | null> {
    return this.$_select("testExecIssueId") as any;
  }

  /**
   * The ID of the test issue associated with the Dataset.
   */
  get testIssueId(): $Field<"testIssueId", string | null> {
    return this.$_select("testIssueId") as any;
  }

  /**
   * The ID of the test plan issue associated with the Dataset.
   */
  get testPlanIssueId(): $Field<"testPlanIssueId", string | null> {
    return this.$_select("testPlanIssueId") as any;
  }

  /**
   * The ID of the test step associated with the Dataset (only for test step datasets).
   */
  get testStepId(): $Field<"testStepId", string | null> {
    return this.$_select("testStepId") as any;
  }
}

/**
 * Parameter type
Represents a single parameter in the Dataset.
 */
export class Parameter extends $Base<"Parameter"> {
  constructor() {
    super("Parameter");
  }

  /**
   * Indicates whether the parameter supports combinations.
   */
  get combinations(): $Field<"combinations", boolean | null> {
    return this.$_select("combinations") as any;
  }

  /**
   * The list of values for the parameter.
   */
  get listValues(): $Field<"listValues", Readonly<Array<string | null>> | null> {
    return this.$_select("listValues") as any;
  }

  /**
   * The name of the parameter.
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  /**
   * The ID of the project list associated with the parameter.
   */
  get projectListId(): $Field<"projectListId", string | null> {
    return this.$_select("projectListId") as any;
  }

  /**
   * The type of the parameter.
   */
  get type(): $Field<"type", string | null> {
    return this.$_select("type") as any;
  }
}

/**
 * DatasetRow type
Represents a single row in the Dataset, containing combinatorial data.
 */
export class DatasetRow extends $Base<"DatasetRow"> {
  constructor() {
    super("DatasetRow");
  }

  /**
   * The values of the row, stored String array.
   */
  get Values(): $Field<"Values", Readonly<Array<string | null>> | null> {
    return this.$_select("Values") as any;
  }

  /**
   * The order of the row in the Dataset.
   */
  get order(): $Field<"order", number | null> {
    return this.$_select("order") as any;
  }
}

/**
 * Test issue type
 */
export class Test extends $Base<"Test"> {
  constructor() {
    super("Test");
  }

  /**
   * List of Coverable Issues associated with the Test issue
   */
  coverableIssues<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<CoverableIssueResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: CoverableIssueResults) => [...Sel]
  ): $Field<"coverableIssues", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new CoverableIssueResults()),
    };
    return this.$_select("coverableIssues", options as any) as any;
  }

  /**
   * Dataset linked to the Test issue.
   */
  dataset<Sel extends Selection<Dataset>>(
    selectorFn: (s: Dataset) => [...Sel]
  ): $Field<"dataset", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Dataset()),
    };
    return this.$_select("dataset", options as any) as any;
  }

  /**
   * Test Repository folder of the Test.
   */
  folder<Sel extends Selection<Folder>>(
    selectorFn: (s: Folder) => [...Sel]
  ): $Field<"folder", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Folder()),
    };
    return this.$_select("folder", options as any) as any;
  }

  /**
   * Gherkin definition of the Test issue.
   */
  get gherkin(): $Field<"gherkin", string | null> {
    return this.$_select("gherkin") as any;
  }

  /**
   * List of Xray History results for the issue
   */
  history<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<XrayHistoryResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: XrayHistoryResults) => [...Sel]
  ): $Field<"history", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new XrayHistoryResults()),
    };
    return this.$_select("history", options as any) as any;
  }

  /**
   * Issue id of the Test issue.
   */
  get issueId(): $Field<"issueId", string | null> {
    return this.$_select("issueId") as any;
  }

  /**
   * Extra Jira information of the Test issue.
   */
  jira<
    Args extends VariabledInput<{
      fields?: Readonly<Array<string | null>> | null;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        fields?: Readonly<Array<string | null>> | null;
      }
    >
  ): $Field<"jira", JSON, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        fields: "[String]",
      },
      args,
    };
    return this.$_select("jira", options as any) as any;
  }

  /**
   * Date when the test was last modified.
   */
  get lastModified(): $Field<"lastModified", string | null> {
    return this.$_select("lastModified") as any;
  }

  /**
   * List of Precondition associated with the Test issue.
   */
  preconditions<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<PreconditionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: PreconditionResults) => [...Sel]
  ): $Field<"preconditions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new PreconditionResults()),
    };
    return this.$_select("preconditions", options as any) as any;
  }

  /**
   * Project id of the Test issue.
   */
  get projectId(): $Field<"projectId", string | null> {
    return this.$_select("projectId") as any;
  }

  /**
 * Gherkin type of the Test issue.
Possible values: 'scenario' or 'scenario_outline'.
 */
  get scenarioType(): $Field<"scenarioType", string | null> {
    return this.$_select("scenarioType") as any;
  }

  /**
   * Status of the Test. This status can be calculated based on latest status, version or Test Plan.
   */
  status<
    Args extends VariabledInput<{
      environment?: string | null;
      isFinal?: boolean | null;
      version?: string | null;
      testPlan?: string | null;
    }>,
    Sel extends Selection<TestStatusType>,
  >(
    args: ExactArgNames<
      Args,
      {
        environment?: string | null;
        isFinal?: boolean | null;
        version?: string | null;
        testPlan?: string | null;
      }
    >,
    selectorFn: (s: TestStatusType) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  status<Sel extends Selection<TestStatusType>>(
    selectorFn: (s: TestStatusType) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel>>;
  status(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        environment: "String",
        isFinal: "Boolean",
        version: "String",
        testPlan: "String",
      },
      args,

      selection: selectorFn(new TestStatusType()),
    };
    return this.$_select("status", options as any) as any;
  }

  /**
   * Step definition of the Test issue.
   */
  steps<Sel extends Selection<Step>>(
    selectorFn: (s: Step) => [...Sel]
  ): $Field<"steps", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Step()),
    };
    return this.$_select("steps", options as any) as any;
  }

  /**
   * List of Test Executions associated with the Test issue.
   */
  testExecutions<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestExecutionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestExecutionResults) => [...Sel]
  ): $Field<"testExecutions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestExecutionResults()),
    };
    return this.$_select("testExecutions", options as any) as any;
  }

  /**
   * List of Test Plans associated with the Test issue.
   */
  testPlans<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestPlanResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestPlanResults) => [...Sel]
  ): $Field<"testPlans", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestPlanResults()),
    };
    return this.$_select("testPlans", options as any) as any;
  }

  /**
   * List of Test Runs for the Test issue
   */
  testRuns<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestRunResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestRunResults) => [...Sel]
  ): $Field<"testRuns", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestRunResults()),
    };
    return this.$_select("testRuns", options as any) as any;
  }

  /**
   * List of Test Sets associated with the Test issue.
   */
  testSets<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestSetResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestSetResults) => [...Sel]
  ): $Field<"testSets", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestSetResults()),
    };
    return this.$_select("testSets", options as any) as any;
  }

  /**
   * Test type of the Test issue.
   */
  testType<Sel extends Selection<TestType>>(
    selectorFn: (s: TestType) => [...Sel]
  ): $Field<"testType", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestType()),
    };
    return this.$_select("testType", options as any) as any;
  }

  /**
   * List of Test versions of the Test
   */
  testVersions<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
      archived?: boolean | null;
      testTypeId?: string | null;
    }>,
    Sel extends Selection<TestVersionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
        archived?: boolean | null;
        testTypeId?: string | null;
      }
    >,
    selectorFn: (s: TestVersionResults) => [...Sel]
  ): $Field<"testVersions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
        archived: "Boolean",
        testTypeId: "String",
      },
      args,

      selection: selectorFn(new TestVersionResults()),
    };
    return this.$_select("testVersions", options as any) as any;
  }

  /**
   * Unstructured definition of the Test issue.
   */
  get unstructured(): $Field<"unstructured", string | null> {
    return this.$_select("unstructured") as any;
  }
}

/**
 * Test Type type
 */
export class TestType extends $Base<"TestType"> {
  constructor() {
    super("TestType");
  }

  /**
   * Id of the Test Type.
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
 * Kind of the Test Type.
Possible values are "Gherkin", "Steps" or "Unstructured".
 */
  get kind(): $Field<"kind", string | null> {
    return this.$_select("kind") as any;
  }

  /**
   * Name of the Test Type.
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }
}

/**
 * Test Step type
 */
export class Step extends $Base<"Step"> {
  constructor() {
    super("Step");
  }

  /**
   * Action of the Step.
   */
  get action(): $Field<"action", string | null> {
    return this.$_select("action") as any;
  }

  /**
   * Attachments of the Step.
   */
  attachments<Sel extends Selection<Attachment>>(
    selectorFn: (s: Attachment) => [...Sel]
  ): $Field<"attachments", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Attachment()),
    };
    return this.$_select("attachments", options as any) as any;
  }

  /**
   * The issue id of the test being called in the step.
   */
  get callTestIssueId(): $Field<"callTestIssueId", string | null> {
    return this.$_select("callTestIssueId") as any;
  }

  /**
   * Custom Fields of the Step.
   */
  customFields<Sel extends Selection<CustomStepField>>(
    selectorFn: (s: CustomStepField) => [...Sel]
  ): $Field<"customFields", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new CustomStepField()),
    };
    return this.$_select("customFields", options as any) as any;
  }

  /**
   * Data of the Step.
   */
  get data(): $Field<"data", string | null> {
    return this.$_select("data") as any;
  }

  /**
   * Id of the Step.
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * Result of the Step.
   */
  get result(): $Field<"result", string | null> {
    return this.$_select("result") as any;
  }
}

/**
 * Step Attachment type
 */
export class Attachment extends $Base<"Attachment"> {
  constructor() {
    super("Attachment");
  }

  /**
   * Download link of the attachment.
   */
  get downloadLink(): $Field<"downloadLink", string | null> {
    return this.$_select("downloadLink") as any;
  }

  /**
   * Filename of the attachment.
   */
  get filename(): $Field<"filename", string | null> {
    return this.$_select("filename") as any;
  }

  /**
   * Id of the attachment.
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * If the file is stored in Jira.
   */
  get storedInJira(): $Field<"storedInJira", boolean | null> {
    return this.$_select("storedInJira") as any;
  }
}

/**
 * Step CustomField type
 */
export class CustomStepField extends $Base<"CustomStepField"> {
  constructor() {
    super("CustomStepField");
  }

  /**
   * Id of the Custom Field.
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * Name of the Custom Field.
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  /**
   * Value of the Custom Field.
   */
  get value(): $Field<"value", JSON | null> {
    return this.$_select("value") as any;
  }
}

/**
 * Test Repository folder type.
 */
export class Folder extends $Base<"Folder"> {
  constructor() {
    super("Folder");
  }

  /**
   * Folder name
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  /**
   * Folder path
   */
  get path(): $Field<"path", string | null> {
    return this.$_select("path") as any;
  }
}

/**
 * Precondition Results type
 */
export class PreconditionResults extends $Base<"PreconditionResults"> {
  constructor() {
    super("PreconditionResults");
  }

  /**
   * Maximum amount of Preconditions to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Precondition issue results.
   */
  results<Sel extends Selection<Precondition>>(
    selectorFn: (s: Precondition) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Precondition()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * Index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of issues.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }
}

/**
 * Precondition issue type
 */
export class Precondition extends $Base<"Precondition"> {
  constructor() {
    super("Precondition");
  }

  /**
   * Definition of the Precondition issue.
   */
  get definition(): $Field<"definition", string | null> {
    return this.$_select("definition") as any;
  }

  /**
   * Test Repository folder of the Precondition.
   */
  folder<Sel extends Selection<Folder>>(
    selectorFn: (s: Folder) => [...Sel]
  ): $Field<"folder", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Folder()),
    };
    return this.$_select("folder", options as any) as any;
  }

  /**
   * List of Xray History results for the issue
   */
  history<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<XrayHistoryResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: XrayHistoryResults) => [...Sel]
  ): $Field<"history", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new XrayHistoryResults()),
    };
    return this.$_select("history", options as any) as any;
  }

  /**
   * Id of the Precondition issue.
   */
  get issueId(): $Field<"issueId", string | null> {
    return this.$_select("issueId") as any;
  }

  /**
   * Extra Jira information of the Precondition Issue.
   */
  jira<
    Args extends VariabledInput<{
      fields?: Readonly<Array<string | null>> | null;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        fields?: Readonly<Array<string | null>> | null;
      }
    >
  ): $Field<"jira", JSON | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        fields: "[String]",
      },
      args,
    };
    return this.$_select("jira", options as any) as any;
  }

  /**
   * Date when the precondition was last modified.
   */
  get lastModified(): $Field<"lastModified", string | null> {
    return this.$_select("lastModified") as any;
  }

  /**
   * Precondition Type of the Precondition issue.
   */
  preconditionType<Sel extends Selection<TestType>>(
    selectorFn: (s: TestType) => [...Sel]
  ): $Field<"preconditionType", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestType()),
    };
    return this.$_select("preconditionType", options as any) as any;
  }

  /**
   * Project id of the Precondition issue.
   */
  get projectId(): $Field<"projectId", string | null> {
    return this.$_select("projectId") as any;
  }

  /**
   * List of the Test versions associated with the Precondition issue.
   */
  testVersions<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
      archived?: boolean | null;
      testTypeId?: string | null;
    }>,
    Sel extends Selection<TestVersionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
        archived?: boolean | null;
        testTypeId?: string | null;
      }
    >,
    selectorFn: (s: TestVersionResults) => [...Sel]
  ): $Field<"testVersions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
        archived: "Boolean",
        testTypeId: "String",
      },
      args,

      selection: selectorFn(new TestVersionResults()),
    };
    return this.$_select("testVersions", options as any) as any;
  }

  /**
   * List of the Tests associated with the Precondition issue.
   */
  tests<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestResults) => [...Sel]
  ): $Field<"tests", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestResults()),
    };
    return this.$_select("tests", options as any) as any;
  }
}

/**
 * Test Results type
 */
export class TestResults extends $Base<"TestResults"> {
  constructor() {
    super("TestResults");
  }

  /**
   * The maximum amount of Tests to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Test issue results.
   */
  results<Sel extends Selection<Test>>(
    selectorFn: (s: Test) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Test()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * The index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of issues.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }

  /**
   * Warnings generated if you have a invalid Test
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Test version results type
 */
export class TestVersionResults extends $Base<"TestVersionResults"> {
  constructor() {
    super("TestVersionResults");
  }

  /**
   * The maximum amount of Test versions to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Test version results.
   */
  results<Sel extends Selection<TestVersion>>(
    selectorFn: (s: TestVersion) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestVersion()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * The index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of Test versions.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }
}

export class TestVersion extends $Base<"TestVersion"> {
  constructor() {
    super("TestVersion");
  }

  /**
   * If is an archived Test version.
   */
  get archived(): $Field<"archived", boolean> {
    return this.$_select("archived") as any;
  }

  /**
   * If is the default Test version.
   */
  get default(): $Field<"default", boolean> {
    return this.$_select("default") as any;
  }

  /**
   * Gherkin definition of the Test version.
   */
  get gherkin(): $Field<"gherkin", string | null> {
    return this.$_select("gherkin") as any;
  }

  /**
   * Number of the Test version.
   */
  get id(): $Field<"id", number> {
    return this.$_select("id") as any;
  }

  /**
   * Date when the Test version was last modified.
   */
  get lastModified(): $Field<"lastModified", string | null> {
    return this.$_select("lastModified") as any;
  }

  /**
   * Name of the Test version.
   */
  get name(): $Field<"name", string> {
    return this.$_select("name") as any;
  }

  preconditions<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<PreconditionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: PreconditionResults) => [...Sel]
  ): $Field<"preconditions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new PreconditionResults()),
    };
    return this.$_select("preconditions", options as any) as any;
  }

  /**
 * Gherkin type of the Test version.
Possible values: 'scenario' or 'scenario_outline'.
 */
  get scenarioType(): $Field<"scenarioType", string | null> {
    return this.$_select("scenarioType") as any;
  }

  /**
   * Step definition of the Test version.
   */
  steps<Sel extends Selection<Step>>(
    selectorFn: (s: Step) => [...Sel]
  ): $Field<"steps", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Step()),
    };
    return this.$_select("steps", options as any) as any;
  }

  test<Sel extends Selection<Test>>(
    selectorFn: (s: Test) => [...Sel]
  ): $Field<"test", GetOutput<Sel>, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Test()),
    };
    return this.$_select("test", options as any) as any;
  }

  /**
   * List of Test Executions associated with the Test version.
   */
  testExecutions<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestExecutionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestExecutionResults) => [...Sel]
  ): $Field<"testExecutions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestExecutionResults()),
    };
    return this.$_select("testExecutions", options as any) as any;
  }

  testRuns<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestRunResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestRunResults) => [...Sel]
  ): $Field<"testRuns", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestRunResults()),
    };
    return this.$_select("testRuns", options as any) as any;
  }

  /**
   * Test type of the Test version.
   */
  testType<Sel extends Selection<TestType>>(
    selectorFn: (s: TestType) => [...Sel]
  ): $Field<"testType", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestType()),
    };
    return this.$_select("testType", options as any) as any;
  }

  /**
   * Unstructured definition of the Test version.
   */
  get unstructured(): $Field<"unstructured", string | null> {
    return this.$_select("unstructured") as any;
  }
}

/**
 * Test Execution Results Type
 */
export class TestExecutionResults extends $Base<"TestExecutionResults"> {
  constructor() {
    super("TestExecutionResults");
  }

  /**
   * Maximum amount of Test Executions to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Test Execution issue results.
   */
  results<Sel extends Selection<TestExecution>>(
    selectorFn: (s: TestExecution) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestExecution()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * Index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of issues.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }
}

/**
 * Test Execution issue type
 */
export class TestExecution extends $Base<"TestExecution"> {
  constructor() {
    super("TestExecution");
  }

  /**
   * List of Xray History results for the issue
   */
  history<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<XrayHistoryResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: XrayHistoryResults) => [...Sel]
  ): $Field<"history", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new XrayHistoryResults()),
    };
    return this.$_select("history", options as any) as any;
  }

  /**
   * Id of the Test Execution issue.
   */
  get issueId(): $Field<"issueId", string | null> {
    return this.$_select("issueId") as any;
  }

  /**
   * Extra Jira information of the Test Execution Issue.
   */
  jira<
    Args extends VariabledInput<{
      fields?: Readonly<Array<string | null>> | null;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        fields?: Readonly<Array<string | null>> | null;
      }
    >
  ): $Field<"jira", JSON | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        fields: "[String]",
      },
      args,
    };
    return this.$_select("jira", options as any) as any;
  }

  /**
   * Date when the test exec was last modified.
   */
  get lastModified(): $Field<"lastModified", string | null> {
    return this.$_select("lastModified") as any;
  }

  /**
   * Project id of the Test Execution issue.
   */
  get projectId(): $Field<"projectId", string | null> {
    return this.$_select("projectId") as any;
  }

  /**
   * Test Environments of the Test Execution.
   */
  get testEnvironments(): $Field<"testEnvironments", Readonly<Array<string | null>> | null> {
    return this.$_select("testEnvironments") as any;
  }

  /**
   * List of Test Plans associated with the Test Execution Issue.
   */
  testPlans<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestPlanResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestPlanResults) => [...Sel]
  ): $Field<"testPlans", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestPlanResults()),
    };
    return this.$_select("testPlans", options as any) as any;
  }

  /**
   * List of Test Runs for the Test Execution Issue.
   */
  testRuns<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestRunResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestRunResults) => [...Sel]
  ): $Field<"testRuns", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestRunResults()),
    };
    return this.$_select("testRuns", options as any) as any;
  }

  /**
   * List of Tests associated with the Test Execution Issue.
   */
  tests<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestResults) => [...Sel]
  ): $Field<"tests", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestResults()),
    };
    return this.$_select("tests", options as any) as any;
  }
}

/**
 * Test Plan Results type
 */
export class TestPlanResults extends $Base<"TestPlanResults"> {
  constructor() {
    super("TestPlanResults");
  }

  /**
   * Maximum amount of Test Plans to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Test Plan issue results.
   */
  results<Sel extends Selection<TestPlan>>(
    selectorFn: (s: TestPlan) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestPlan()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * Index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of issues.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Test Plan issue type
 */
export class TestPlan extends $Base<"TestPlan"> {
  constructor() {
    super("TestPlan");
  }

  /**
   * Folder structure of the Test Plan.
   */
  folders<Sel extends Selection<FolderResults>>(
    selectorFn: (s: FolderResults) => [...Sel]
  ): $Field<"folders", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new FolderResults()),
    };
    return this.$_select("folders", options as any) as any;
  }

  /**
   * List of Xray History results for the issue
   */
  history<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<XrayHistoryResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: XrayHistoryResults) => [...Sel]
  ): $Field<"history", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new XrayHistoryResults()),
    };
    return this.$_select("history", options as any) as any;
  }

  /**
   * Id of the Test Plan issue.
   */
  get issueId(): $Field<"issueId", string | null> {
    return this.$_select("issueId") as any;
  }

  /**
   * Extra Jira information of the Test Plan issue.
   */
  jira<
    Args extends VariabledInput<{
      fields?: Readonly<Array<string | null>> | null;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        fields?: Readonly<Array<string | null>> | null;
      }
    >
  ): $Field<"jira", JSON | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        fields: "[String]",
      },
      args,
    };
    return this.$_select("jira", options as any) as any;
  }

  /**
   * Date when the test plan was last modified.
   */
  get lastModified(): $Field<"lastModified", string | null> {
    return this.$_select("lastModified") as any;
  }

  /**
   * Project id of the Test Plan issue.
   */
  get projectId(): $Field<"projectId", string | null> {
    return this.$_select("projectId") as any;
  }

  /**
   * List of Test Executions associated with the Test Plan issue.
   */
  testExecutions<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestExecutionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestExecutionResults) => [...Sel]
  ): $Field<"testExecutions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestExecutionResults()),
    };
    return this.$_select("testExecutions", options as any) as any;
  }

  /**
   * List of Tests associated with the Test Plan issue.
   */
  tests<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestResults) => [...Sel]
  ): $Field<"tests", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestResults()),
    };
    return this.$_select("tests", options as any) as any;
  }
}

/**
 * Xray History Results type
 */
export class XrayHistoryResults extends $Base<"XrayHistoryResults"> {
  constructor() {
    super("XrayHistoryResults");
  }

  /**
   * Maximum amount of History results to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Precondition issue results.
   */
  results<Sel extends Selection<XrayHistoryEntry>>(
    selectorFn: (s: XrayHistoryEntry) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new XrayHistoryEntry()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * Index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of issues.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }
}

/**
 * Xray History Entry type
 */
export class XrayHistoryEntry extends $Base<"XrayHistoryEntry"> {
  constructor() {
    super("XrayHistoryEntry");
  }

  /**
   * Action performed.
   */
  get action(): $Field<"action", string | null> {
    return this.$_select("action") as any;
  }

  /**
   * Details of the change(s).
   */
  changes<Sel extends Selection<Changes>>(
    selectorFn: (s: Changes) => [...Sel]
  ): $Field<"changes", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Changes()),
    };
    return this.$_select("changes", options as any) as any;
  }

  /**
   * Date of change(s).
   */
  get date(): $Field<"date", string | null> {
    return this.$_select("date") as any;
  }

  /**
   * User that performed the change(s).
   */
  get user(): $Field<"user", string | null> {
    return this.$_select("user") as any;
  }

  /**
   * Test Version that the changes refer to (if applicable).
   */
  get version(): $Field<"version", string | null> {
    return this.$_select("version") as any;
  }
}

/**
 * Xray History Changes type
 */
export class Changes extends $Base<"Changes"> {
  constructor() {
    super("Changes");
  }

  /**
   * Change details.
   */
  get change(): $Field<"change", string | null> {
    return this.$_select("change") as any;
  }

  /**
   * Field the change refers to.
   */
  get field(): $Field<"field", string | null> {
    return this.$_select("field") as any;
  }
}

/**
 * Test Run Results type
 */
export class TestRunResults extends $Base<"TestRunResults"> {
  constructor() {
    super("TestRunResults");
  }

  /**
   * The maximum amount of Test Runs to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Test Run results.
   */
  results<Sel extends Selection<TestRun>>(
    selectorFn: (s: TestRun) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestRun()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * The index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of Test Runs.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }
}

/**
 * Test Run type
 */
export class TestRun extends $Base<"TestRun"> {
  constructor() {
    super("TestRun");
  }

  /**
   * User's account id assigned to the Test Run. This is user assigned to the Test Run, not taking into account the assignee of the test execution.
   */
  get assigneeId(): $Field<"assigneeId", string | null> {
    return this.$_select("assigneeId") as any;
  }

  /**
   * Comment definition of the Test Run.
   */
  get comment(): $Field<"comment", string | null> {
    return this.$_select("comment") as any;
  }

  /**
   * Custom Fields of the Test Run.
   */
  customFields<Sel extends Selection<TestRunCustomFieldValue>>(
    selectorFn: (s: TestRunCustomFieldValue) => [...Sel]
  ): $Field<"customFields", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestRunCustomFieldValue()),
    };
    return this.$_select("customFields", options as any) as any;
  }

  /**
   * Defects of the Test Run.
   */
  get defects(): $Field<"defects", Readonly<Array<string | null>> | null> {
    return this.$_select("defects") as any;
  }

  /**
   * Evidence of the Test Run.
   */
  evidence<Sel extends Selection<Evidence>>(
    selectorFn: (s: Evidence) => [...Sel]
  ): $Field<"evidence", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Evidence()),
    };
    return this.$_select("evidence", options as any) as any;
  }

  /**
   * Examples of the Test Run.
   */
  examples<Sel extends Selection<Example>>(
    selectorFn: (s: Example) => [...Sel]
  ): $Field<"examples", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Example()),
    };
    return this.$_select("examples", options as any) as any;
  }

  /**
   * User's account id that executed the Test Run.
   */
  get executedById(): $Field<"executedById", string | null> {
    return this.$_select("executedById") as any;
  }

  /**
   * Finished On date of the Test Run.
   */
  get finishedOn(): $Field<"finishedOn", string | null> {
    return this.$_select("finishedOn") as any;
  }

  /**
   * Cucumber definition of the Test issue.
   */
  get gherkin(): $Field<"gherkin", string | null> {
    return this.$_select("gherkin") as any;
  }

  /**
   * Id of the Test Run.
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * Iterations of the Test Run.
   */
  iterations<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestRunIterationResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestRunIterationResults) => [...Sel]
  ): $Field<"iterations", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestRunIterationResults()),
    };
    return this.$_select("iterations", options as any) as any;
  }

  /**
   * Date when the test run was last modified.
   */
  get lastModified(): $Field<"lastModified", string | null> {
    return this.$_select("lastModified") as any;
  }

  /**
   * Parameters of the Test Run.
   */
  parameters<Sel extends Selection<TestRunParameter>>(
    selectorFn: (s: TestRunParameter) => [...Sel]
  ): $Field<"parameters", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestRunParameter()),
    };
    return this.$_select("parameters", options as any) as any;
  }

  /**
   * Preconditions of the Test Run.
   */
  preconditions<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestRunPreconditionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestRunPreconditionResults) => [...Sel]
  ): $Field<"preconditions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestRunPreconditionResults()),
    };
    return this.$_select("preconditions", options as any) as any;
  }

  /**
   * Results of the Test Run.
   */
  results<Sel extends Selection<Result>>(
    selectorFn: (s: Result) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Result()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * Cucumber Type definition of the Test Run.
   */
  get scenarioType(): $Field<"scenarioType", string | null> {
    return this.$_select("scenarioType") as any;
  }

  /**
   * Started On date of the Test Run.
   */
  get startedOn(): $Field<"startedOn", string | null> {
    return this.$_select("startedOn") as any;
  }

  /**
   * Status of the Test Run.
   */
  status<Sel extends Selection<Status>>(
    selectorFn: (s: Status) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Status()),
    };
    return this.$_select("status", options as any) as any;
  }

  /**
   * Step definition of the Test Run.
   */
  steps<Sel extends Selection<TestRunStep>>(
    selectorFn: (s: TestRunStep) => [...Sel]
  ): $Field<"steps", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestRunStep()),
    };
    return this.$_select("steps", options as any) as any;
  }

  /**
   * Test of the Test Run.
   */
  test<Sel extends Selection<Test>>(
    selectorFn: (s: Test) => [...Sel]
  ): $Field<"test", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Test()),
    };
    return this.$_select("test", options as any) as any;
  }

  /**
   * Test Execution of the Test Run.
   */
  testExecution<Sel extends Selection<TestExecution>>(
    selectorFn: (s: TestExecution) => [...Sel]
  ): $Field<"testExecution", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestExecution()),
    };
    return this.$_select("testExecution", options as any) as any;
  }

  /**
   * Test Type of the Test Run.
   */
  testType<Sel extends Selection<TestType>>(
    selectorFn: (s: TestType) => [...Sel]
  ): $Field<"testType", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestType()),
    };
    return this.$_select("testType", options as any) as any;
  }

  /**
   * Test version of the Test Run.
   */
  testVersion<Sel extends Selection<TestVersion>>(
    selectorFn: (s: TestVersion) => [...Sel]
  ): $Field<"testVersion", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestVersion()),
    };
    return this.$_select("testVersion", options as any) as any;
  }

  /**
   * Generic definition of the Test issue.
   */
  get unstructured(): $Field<"unstructured", string | null> {
    return this.$_select("unstructured") as any;
  }
}

/**
 * Status Type
 */
export class Status extends $Base<"Status"> {
  constructor() {
    super("Status");
  }

  /**
   * Color of the Status.
   */
  get color(): $Field<"color", string | null> {
    return this.$_select("color") as any;
  }

  /**
   * Coverage mapping of the Status.
   */
  get coverageStatus(): $Field<"coverageStatus", string | null> {
    return this.$_select("coverageStatus") as any;
  }

  /**
   * Description of the Status.
   */
  get description(): $Field<"description", string | null> {
    return this.$_select("description") as any;
  }

  /**
   * Whether the Status is final or not.
   */
  get final(): $Field<"final", boolean | null> {
    return this.$_select("final") as any;
  }

  /**
   * Name of the Status.
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }
}

/**
 * Evidence Type
 */
export class Evidence extends $Base<"Evidence"> {
  constructor() {
    super("Evidence");
  }

  /**
   * Evidence creation timestamp.
   */
  get createdOn(): $Field<"createdOn", string | null> {
    return this.$_select("createdOn") as any;
  }

  /**
   * Download link of the Evidence.
   */
  get downloadLink(): $Field<"downloadLink", string | null> {
    return this.$_select("downloadLink") as any;
  }

  /**
   * Filename of the Evidence.
   */
  get filename(): $Field<"filename", string | null> {
    return this.$_select("filename") as any;
  }

  /**
   * Id of the Evidence.
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * File size in bytes.
   */
  get size(): $Field<"size", number | null> {
    return this.$_select("size") as any;
  }

  /**
   * If file is stored in Jira
   */
  get storedInJira(): $Field<"storedInJira", boolean | null> {
    return this.$_select("storedInJira") as any;
  }
}

/**
 * Test Run Step Type
 */
export class TestRunStep extends $Base<"TestRunStep"> {
  constructor() {
    super("TestRunStep");
  }

  /**
   * Action of the Test Run Step.
   */
  get action(): $Field<"action", string | null> {
    return this.$_select("action") as any;
  }

  /**
   * Actual Result of the Test Run Step.
   */
  get actualResult(): $Field<"actualResult", string | null> {
    return this.$_select("actualResult") as any;
  }

  /**
   * Attachments of the Test Run Step.
   */
  attachments<Sel extends Selection<Attachment>>(
    selectorFn: (s: Attachment) => [...Sel]
  ): $Field<"attachments", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Attachment()),
    };
    return this.$_select("attachments", options as any) as any;
  }

  /**
   * Comment of the Test Run Step.
   */
  get comment(): $Field<"comment", string | null> {
    return this.$_select("comment") as any;
  }

  /**
   * Custom Fields of the Test Run Step.
   */
  customFields<Sel extends Selection<TestRunCustomStepField>>(
    selectorFn: (s: TestRunCustomStepField) => [...Sel]
  ): $Field<"customFields", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestRunCustomStepField()),
    };
    return this.$_select("customFields", options as any) as any;
  }

  /**
   * Data of the Test Run Step.
   */
  get data(): $Field<"data", string | null> {
    return this.$_select("data") as any;
  }

  /**
   * Defects of the Test Run Step.
   */
  get defects(): $Field<"defects", Readonly<Array<string | null>> | null> {
    return this.$_select("defects") as any;
  }

  /**
   * Evidence of the Test Run Step.
   */
  evidence<Sel extends Selection<Evidence>>(
    selectorFn: (s: Evidence) => [...Sel]
  ): $Field<"evidence", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Evidence()),
    };
    return this.$_select("evidence", options as any) as any;
  }

  /**
   * Id of the Test Run Step.
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * Result of the Test Run Step.
   */
  get result(): $Field<"result", string | null> {
    return this.$_select("result") as any;
  }

  /**
   * Status of the Test Run Step.
   */
  status<Sel extends Selection<StepStatus>>(
    selectorFn: (s: StepStatus) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new StepStatus()),
    };
    return this.$_select("status", options as any) as any;
  }
}

/**
 * Step Status Type
 */
export class StepStatus extends $Base<"StepStatus"> {
  constructor() {
    super("StepStatus");
  }

  /**
   * Color of the Status.
   */
  get color(): $Field<"color", string | null> {
    return this.$_select("color") as any;
  }

  /**
   * Description of the Status.
   */
  get description(): $Field<"description", string | null> {
    return this.$_select("description") as any;
  }

  /**
   * Name of the Status.
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  /**
   * The test status to which the step status is mapped to.
   */
  testStatus<Sel extends Selection<Status>>(
    selectorFn: (s: Status) => [...Sel]
  ): $Field<"testStatus", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Status()),
    };
    return this.$_select("testStatus", options as any) as any;
  }
}

/**
 * Step CustomField type
 */
export class TestRunCustomStepField extends $Base<"TestRunCustomStepField"> {
  constructor() {
    super("TestRunCustomStepField");
  }

  /**
   * Id of the Custom Field.
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * Name of the Custom Field.
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  /**
   * Value of the Custom Field.
   */
  get value(): $Field<"value", JSON | null> {
    return this.$_select("value") as any;
  }
}

/**
 * Example Type
 */
export class Example extends $Base<"Example"> {
  constructor() {
    super("Example");
  }

  /**
   * Duration of the Example.
   */
  get duration(): $Field<"duration", number | null> {
    return this.$_select("duration") as any;
  }

  /**
   * Id of the Example.
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * Status of the Example.
   */
  status<Sel extends Selection<StepStatus>>(
    selectorFn: (s: StepStatus) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new StepStatus()),
    };
    return this.$_select("status", options as any) as any;
  }
}

/**
 * Result Type
 */
export class Result extends $Base<"Result"> {
  constructor() {
    super("Result");
  }

  /**
   * Backgrounds of the Results.
   */
  backgrounds<Sel extends Selection<ResultsStep>>(
    selectorFn: (s: ResultsStep) => [...Sel]
  ): $Field<"backgrounds", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ResultsStep()),
    };
    return this.$_select("backgrounds", options as any) as any;
  }

  /**
   * Duration of the Result.
   */
  get duration(): $Field<"duration", number | null> {
    return this.$_select("duration") as any;
  }

  /**
   * Examples of the Result.
   */
  examples<Sel extends Selection<ResultsExample>>(
    selectorFn: (s: ResultsExample) => [...Sel]
  ): $Field<"examples", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ResultsExample()),
    };
    return this.$_select("examples", options as any) as any;
  }

  /**
   * Hooks of the Results.
   */
  hooks<Sel extends Selection<ResultsStep>>(
    selectorFn: (s: ResultsStep) => [...Sel]
  ): $Field<"hooks", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ResultsStep()),
    };
    return this.$_select("hooks", options as any) as any;
  }

  /**
   * Output if exist an error or a failure (JUNIT, XUNIT, NUNIT, TESTNG)
   */
  get log(): $Field<"log", string | null> {
    return this.$_select("log") as any;
  }

  /**
   * Name of the Result.
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  /**
   * Status of the Result.
   */
  status<Sel extends Selection<StepStatus>>(
    selectorFn: (s: StepStatus) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new StepStatus()),
    };
    return this.$_select("status", options as any) as any;
  }

  /**
   * Steps of the Results.
   */
  steps<Sel extends Selection<ResultsStep>>(
    selectorFn: (s: ResultsStep) => [...Sel]
  ): $Field<"steps", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ResultsStep()),
    };
    return this.$_select("steps", options as any) as any;
  }

  /**
   * Whether or not the Result was imported.
   */
  get wasImported(): $Field<"wasImported", string | null> {
    return this.$_select("wasImported") as any;
  }
}

/**
 * Results Example Type
 */
export class ResultsExample extends $Base<"ResultsExample"> {
  constructor() {
    super("ResultsExample");
  }

  /**
   * Backgrounds of the Results.
   */
  backgrounds<Sel extends Selection<ResultsStep>>(
    selectorFn: (s: ResultsStep) => [...Sel]
  ): $Field<"backgrounds", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ResultsStep()),
    };
    return this.$_select("backgrounds", options as any) as any;
  }

  /**
   * Duration of the Result.
   */
  get duration(): $Field<"duration", number | null> {
    return this.$_select("duration") as any;
  }

  /**
   * Hooks of the Results.
   */
  hooks<Sel extends Selection<ResultsStep>>(
    selectorFn: (s: ResultsStep) => [...Sel]
  ): $Field<"hooks", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ResultsStep()),
    };
    return this.$_select("hooks", options as any) as any;
  }

  /**
   * Status of the Result.
   */
  status<Sel extends Selection<StepStatus>>(
    selectorFn: (s: StepStatus) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new StepStatus()),
    };
    return this.$_select("status", options as any) as any;
  }

  /**
   * Steps of the Results.
   */
  steps<Sel extends Selection<ResultsStep>>(
    selectorFn: (s: ResultsStep) => [...Sel]
  ): $Field<"steps", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ResultsStep()),
    };
    return this.$_select("steps", options as any) as any;
  }

  /**
   * Whether or not the Result was imported.
   */
  get wasImported(): $Field<"wasImported", string | null> {
    return this.$_select("wasImported") as any;
  }
}

/**
 * Results Step
 */
export class ResultsStep extends $Base<"ResultsStep"> {
  constructor() {
    super("ResultsStep");
  }

  /**
   * Duration of the step.
   */
  get duration(): $Field<"duration", number | null> {
    return this.$_select("duration") as any;
  }

  /**
   * Embeddings of the step.
   */
  embeddings<Sel extends Selection<ResultsEmbedding>>(
    selectorFn: (s: ResultsEmbedding) => [...Sel]
  ): $Field<"embeddings", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ResultsEmbedding()),
    };
    return this.$_select("embeddings", options as any) as any;
  }

  /**
   * Error of the step.
   */
  get error(): $Field<"error", string | null> {
    return this.$_select("error") as any;
  }

  /**
   * If a gherkin step, keyword of the gherkin step.
   */
  get keyword(): $Field<"keyword", string | null> {
    return this.$_select("keyword") as any;
  }

  /**
   * If a Robot step, output of the Robot step.
   */
  get log(): $Field<"log", string | null> {
    return this.$_select("log") as any;
  }

  /**
   * Name of the step.
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  /**
   * Status of the step.
   */
  status<Sel extends Selection<StepStatus>>(
    selectorFn: (s: StepStatus) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new StepStatus()),
    };
    return this.$_select("status", options as any) as any;
  }
}

/**
 * Results Embedding
 */
export class ResultsEmbedding extends $Base<"ResultsEmbedding"> {
  constructor() {
    super("ResultsEmbedding");
  }

  /**
   * Data of the Embedding. Base64 format.
   */
  get data(): $Field<"data", string | null> {
    return this.$_select("data") as any;
  }

  /**
   * Link to download the embedding if no data is present
   */
  get downloadLink(): $Field<"downloadLink", string | null> {
    return this.$_select("downloadLink") as any;
  }

  /**
   * Filename of the Embedding.
   */
  get filename(): $Field<"filename", string | null> {
    return this.$_select("filename") as any;
  }

  /**
   * Mime Type of the Embedding.
   */
  get mimeType(): $Field<"mimeType", string | null> {
    return this.$_select("mimeType") as any;
  }
}

/**
 * Precondition Results type
 */
export class TestRunPreconditionResults extends $Base<"TestRunPreconditionResults"> {
  constructor() {
    super("TestRunPreconditionResults");
  }

  /**
   * Maximum amount of Preconditions to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Precondition results.
   */
  results<Sel extends Selection<TestRunPrecondition>>(
    selectorFn: (s: TestRunPrecondition) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestRunPrecondition()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * Index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of preconditions.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }
}

/**
 * Test Run Precondition type
 */
export class TestRunPrecondition extends $Base<"TestRunPrecondition"> {
  constructor() {
    super("TestRunPrecondition");
  }

  /**
   * Precondition definition.
   */
  get definition(): $Field<"definition", string | null> {
    return this.$_select("definition") as any;
  }

  /**
   * Precondition of the Test Run.
   */
  preconditionRef<Sel extends Selection<Precondition>>(
    selectorFn: (s: Precondition) => [...Sel]
  ): $Field<"preconditionRef", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Precondition()),
    };
    return this.$_select("preconditionRef", options as any) as any;
  }
}

/**
 * Custom Fields Type
 */
export class TestRunCustomFieldValue extends $Base<"TestRunCustomFieldValue"> {
  constructor() {
    super("TestRunCustomFieldValue");
  }

  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  get values(): $Field<"values", JSON | null> {
    return this.$_select("values") as any;
  }
}

/**
 * Test Run parameter type
 */
export class TestRunParameter extends $Base<"TestRunParameter"> {
  constructor() {
    super("TestRunParameter");
  }

  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  get value(): $Field<"value", string | null> {
    return this.$_select("value") as any;
  }
}

/**
 * Test Run iterations results type
 */
export class TestRunIterationResults extends $Base<"TestRunIterationResults"> {
  constructor() {
    super("TestRunIterationResults");
  }

  /**
   * Maximum amount of iterations to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Iteration results.
   */
  results<Sel extends Selection<TestRunIteration>>(
    selectorFn: (s: TestRunIteration) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestRunIteration()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * Index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of iterations.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }
}

/**
 * Test Run iteration type
 */
export class TestRunIteration extends $Base<"TestRunIteration"> {
  constructor() {
    super("TestRunIteration");
  }

  /**
   * Parameters of the iteration.
   */
  parameters<Sel extends Selection<TestRunParameter>>(
    selectorFn: (s: TestRunParameter) => [...Sel]
  ): $Field<"parameters", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestRunParameter()),
    };
    return this.$_select("parameters", options as any) as any;
  }

  /**
   * Rank of the iteration.
   */
  get rank(): $Field<"rank", string | null> {
    return this.$_select("rank") as any;
  }

  /**
   * Status of the iteration.
   */
  status<Sel extends Selection<StepStatus>>(
    selectorFn: (s: StepStatus) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new StepStatus()),
    };
    return this.$_select("status", options as any) as any;
  }

  /**
   * Step results of the iteration.
   */
  stepResults<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestRunIterationStepResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestRunIterationStepResults) => [...Sel]
  ): $Field<"stepResults", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestRunIterationStepResults()),
    };
    return this.$_select("stepResults", options as any) as any;
  }
}

/**
 * Test Run iteration step results results type
 */
export class TestRunIterationStepResults extends $Base<"TestRunIterationStepResults"> {
  constructor() {
    super("TestRunIterationStepResults");
  }

  /**
   * Maximum amount of step results to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Step results.
   */
  results<Sel extends Selection<TestRunIterationStepResult>>(
    selectorFn: (s: TestRunIterationStepResult) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestRunIterationStepResult()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * Index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of steps.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }
}

/**
 * Test Run iteration step result type
 */
export class TestRunIterationStepResult extends $Base<"TestRunIterationStepResult"> {
  constructor() {
    super("TestRunIterationStepResult");
  }

  /**
   * Actual Result of the Test Run step.
   */
  get actualResult(): $Field<"actualResult", string | null> {
    return this.$_select("actualResult") as any;
  }

  /**
   * Comment of the Test Run step.
   */
  get comment(): $Field<"comment", string | null> {
    return this.$_select("comment") as any;
  }

  /**
   * Defects of the Test Run step.
   */
  get defects(): $Field<"defects", Readonly<Array<string | null>> | null> {
    return this.$_select("defects") as any;
  }

  /**
   * Evidence of the Test Run step.
   */
  evidence<Sel extends Selection<Evidence>>(
    selectorFn: (s: Evidence) => [...Sel]
  ): $Field<"evidence", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Evidence()),
    };
    return this.$_select("evidence", options as any) as any;
  }

  /**
   * Id of the Test Run step.
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * Status of the Test Run step.
   */
  status<Sel extends Selection<StepStatus>>(
    selectorFn: (s: StepStatus) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new StepStatus()),
    };
    return this.$_select("status", options as any) as any;
  }
}

/**
 * Test Set Results
 */
export class TestSetResults extends $Base<"TestSetResults"> {
  constructor() {
    super("TestSetResults");
  }

  /**
   * Maximum amount of test sets to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Test Set issue results.
   */
  results<Sel extends Selection<TestSet>>(
    selectorFn: (s: TestSet) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestSet()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * Index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of issues.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }
}

/**
 * Test Set type
 */
export class TestSet extends $Base<"TestSet"> {
  constructor() {
    super("TestSet");
  }

  /**
   * List of Xray History results for the issue
   */
  history<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<XrayHistoryResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: XrayHistoryResults) => [...Sel]
  ): $Field<"history", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new XrayHistoryResults()),
    };
    return this.$_select("history", options as any) as any;
  }

  /**
   * Issue id of the Test Set Issue.
   */
  get issueId(): $Field<"issueId", string | null> {
    return this.$_select("issueId") as any;
  }

  /**
   * Extra Jira information of the Test Set Issue.
   */
  jira<
    Args extends VariabledInput<{
      fields?: Readonly<Array<string | null>> | null;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        fields?: Readonly<Array<string | null>> | null;
      }
    >
  ): $Field<"jira", JSON | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        fields: "[String]",
      },
      args,
    };
    return this.$_select("jira", options as any) as any;
  }

  /**
   * Date when the test set was last modified.
   */
  get lastModified(): $Field<"lastModified", string | null> {
    return this.$_select("lastModified") as any;
  }

  /**
   * Project id of the Test Set Issue.
   */
  get projectId(): $Field<"projectId", string | null> {
    return this.$_select("projectId") as any;
  }

  /**
   * List of Tests associated with the Test Set Issue.
   */
  tests<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestResults) => [...Sel]
  ): $Field<"tests", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestResults()),
    };
    return this.$_select("tests", options as any) as any;
  }
}

/**
 * Coverable Issue Results type
 */
export class CoverableIssueResults extends $Base<"CoverableIssueResults"> {
  constructor() {
    super("CoverableIssueResults");
  }

  /**
   * The maximum amount of Coverable Issues to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Test issue results.
   */
  results<Sel extends Selection<CoverableIssue>>(
    selectorFn: (s: CoverableIssue) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new CoverableIssue()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * The index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of issues.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }

  /**
   * Warnings generated if you have a invalid Coverable Issue
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

export class CoverableIssue extends $Base<"CoverableIssue"> {
  constructor() {
    super("CoverableIssue");
  }

  /**
   * Issue id of the Coverable Issue Issue.
   */
  get issueId(): $Field<"issueId", string | null> {
    return this.$_select("issueId") as any;
  }

  /**
 * Extra Jira information of the Coverable issue.

Arguments
fields: List of the fields to be displayed.
 */
  jira<
    Args extends VariabledInput<{
      fields?: Readonly<Array<string | null>> | null;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        fields?: Readonly<Array<string | null>> | null;
      }
    >
  ): $Field<"jira", JSON, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        fields: "[String]",
      },
      args,
    };
    return this.$_select("jira", options as any) as any;
  }

  /**
 * Test Coverage Status of the Coverable Issue. This status can be calculated based on latest status, version or Test Plan.

Arguments
environment: the environment for which to calculate the for status.
isFinal: whether the final statuses has precedence over non-final.
version: the version name for which to calculate the status for.
testPlan: the Test Plan issue id for which to calculate the status for.
 */
  status<
    Args extends VariabledInput<{
      environment?: string | null;
      isFinal?: boolean | null;
      version?: string | null;
      testPlan?: string | null;
    }>,
    Sel extends Selection<CoverageStatus>,
  >(
    args: ExactArgNames<
      Args,
      {
        environment?: string | null;
        isFinal?: boolean | null;
        version?: string | null;
        testPlan?: string | null;
      }
    >,
    selectorFn: (s: CoverageStatus) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  status<Sel extends Selection<CoverageStatus>>(
    selectorFn: (s: CoverageStatus) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel>>;
  status(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        environment: "String",
        isFinal: "Boolean",
        version: "String",
        testPlan: "String",
      },
      args,

      selection: selectorFn(new CoverageStatus()),
    };
    return this.$_select("status", options as any) as any;
  }

  /**
 * List of Tests associated with the Coverable Issue issue.

Arguments
issueIds: the issue ids of the Tests.
limit: the maximum amount of tests to be returned. The maximum is 100.
start: the index of the first item to return in the page of results (page offset).
 */
  tests<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestResults) => [...Sel]
  ): $Field<"tests", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestResults()),
    };
    return this.$_select("tests", options as any) as any;
  }
}

export class CoverageStatus extends $Base<"CoverageStatus"> {
  constructor() {
    super("CoverageStatus");
  }

  /**
   * Color of the Coverage Status
   */
  get color(): $Field<"color", string | null> {
    return this.$_select("color") as any;
  }

  /**
   * Description of the Coverage Status
   */
  get description(): $Field<"description", string | null> {
    return this.$_select("description") as any;
  }

  /**
   * Name of the Coverage Status
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }
}

/**
 * Test Status Type
 */
export class TestStatusType extends $Base<"TestStatusType"> {
  constructor() {
    super("TestStatusType");
  }

  /**
   * Color of the Test Status.
   */
  get color(): $Field<"color", string | null> {
    return this.$_select("color") as any;
  }

  /**
   * Description of the Test Status.
   */
  get description(): $Field<"description", string | null> {
    return this.$_select("description") as any;
  }

  /**
   * Whether the status is final or not.
   */
  get final(): $Field<"final", boolean | null> {
    return this.$_select("final") as any;
  }

  /**
   * Name of the Test Status.
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }
}

/**
 * Test Type input
 */
export type TestTypeInput = {
  id?: string | null;
  kind?: string | null;
  name?: string | null;
};

/**
 * Folder Search input
 */
export type FolderSearchInput = {
  includeDescendants?: boolean | null;
  path: string;
  testPlanId?: string | null;
};

/**
 * Expaded test issue type
 */
export class ExpandedTest extends $Base<"ExpandedTest"> {
  constructor() {
    super("ExpandedTest");
  }

  /**
   * List of Coverable Issues associated with the Test issue
   */
  coverableIssues<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<CoverableIssueResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: CoverableIssueResults) => [...Sel]
  ): $Field<"coverableIssues", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new CoverableIssueResults()),
    };
    return this.$_select("coverableIssues", options as any) as any;
  }

  /**
   * Dataset linked to the Test issue.
   */
  dataset<Sel extends Selection<Dataset>>(
    selectorFn: (s: Dataset) => [...Sel]
  ): $Field<"dataset", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Dataset()),
    };
    return this.$_select("dataset", options as any) as any;
  }

  /**
   * Test Repository folder of the Test.
   */
  folder<Sel extends Selection<Folder>>(
    selectorFn: (s: Folder) => [...Sel]
  ): $Field<"folder", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Folder()),
    };
    return this.$_select("folder", options as any) as any;
  }

  /**
   * Gherkin definition of the Test issue.
   */
  get gherkin(): $Field<"gherkin", string | null> {
    return this.$_select("gherkin") as any;
  }

  /**
   * List of Xray History results for the issue
   */
  history<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<XrayHistoryResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: XrayHistoryResults) => [...Sel]
  ): $Field<"history", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new XrayHistoryResults()),
    };
    return this.$_select("history", options as any) as any;
  }

  /**
   * Issue id of the Test issue.
   */
  get issueId(): $Field<"issueId", string | null> {
    return this.$_select("issueId") as any;
  }

  /**
   * Extra Jira information of the Test issue.
   */
  jira<
    Args extends VariabledInput<{
      fields?: Readonly<Array<string | null>> | null;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        fields?: Readonly<Array<string | null>> | null;
      }
    >
  ): $Field<"jira", JSON, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        fields: "[String]",
      },
      args,
    };
    return this.$_select("jira", options as any) as any;
  }

  /**
   * Date when the test was last modified.
   */
  get lastModified(): $Field<"lastModified", string | null> {
    return this.$_select("lastModified") as any;
  }

  /**
   * List of Precondition associated with the Test issue.
   */
  preconditions<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<PreconditionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: PreconditionResults) => [...Sel]
  ): $Field<"preconditions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new PreconditionResults()),
    };
    return this.$_select("preconditions", options as any) as any;
  }

  /**
   * Project id of the Test issue.
   */
  get projectId(): $Field<"projectId", string | null> {
    return this.$_select("projectId") as any;
  }

  /**
 * Gherkin type of the Test issue.
Possible values: 'scenario' or 'scenario_outline'.
 */
  get scenarioType(): $Field<"scenarioType", string | null> {
    return this.$_select("scenarioType") as any;
  }

  /**
   * Status of the Test. This status can be calculated based on latest status, version or Test Plan.
   */
  status<
    Args extends VariabledInput<{
      environment?: string | null;
      isFinal?: boolean | null;
      version?: string | null;
      testPlan?: string | null;
    }>,
    Sel extends Selection<TestStatusType>,
  >(
    args: ExactArgNames<
      Args,
      {
        environment?: string | null;
        isFinal?: boolean | null;
        version?: string | null;
        testPlan?: string | null;
      }
    >,
    selectorFn: (s: TestStatusType) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel, Args>>;
  status<Sel extends Selection<TestStatusType>>(
    selectorFn: (s: TestStatusType) => [...Sel]
  ): $Field<"status", GetOutput<Sel> | null, GetVariables<Sel>>;
  status(arg1: any, arg2?: any) {
    const { args, selectorFn } = !arg2
      ? { args: {}, selectorFn: arg1 }
      : { args: arg1, selectorFn: arg2 };

    const options = {
      argTypes: {
        environment: "String",
        isFinal: "Boolean",
        version: "String",
        testPlan: "String",
      },
      args,

      selection: selectorFn(new TestStatusType()),
    };
    return this.$_select("status", options as any) as any;
  }

  /**
   * Expanded step definition of the test.
   */
  steps<Sel extends Selection<ExpandedStep>>(
    selectorFn: (s: ExpandedStep) => [...Sel]
  ): $Field<"steps", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ExpandedStep()),
    };
    return this.$_select("steps", options as any) as any;
  }

  /**
   * List of Test Executions associated with the Test issue.
   */
  testExecutions<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestExecutionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestExecutionResults) => [...Sel]
  ): $Field<"testExecutions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestExecutionResults()),
    };
    return this.$_select("testExecutions", options as any) as any;
  }

  /**
   * List of Test Plans associated with the Test issue.
   */
  testPlans<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestPlanResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestPlanResults) => [...Sel]
  ): $Field<"testPlans", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestPlanResults()),
    };
    return this.$_select("testPlans", options as any) as any;
  }

  /**
   * List of Test Runs for the Test issue
   */
  testRuns<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestRunResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestRunResults) => [...Sel]
  ): $Field<"testRuns", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestRunResults()),
    };
    return this.$_select("testRuns", options as any) as any;
  }

  /**
   * List of Test Sets associated with the Test issue.
   */
  testSets<
    Args extends VariabledInput<{
      issueIds?: Readonly<Array<string | null>> | null;
      limit: number;
      start?: number | null;
    }>,
    Sel extends Selection<TestSetResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueIds?: Readonly<Array<string | null>> | null;
        limit: number;
        start?: number | null;
      }
    >,
    selectorFn: (s: TestSetResults) => [...Sel]
  ): $Field<"testSets", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueIds: "[String]",
        limit: "Int!",
        start: "Int",
      },
      args,

      selection: selectorFn(new TestSetResults()),
    };
    return this.$_select("testSets", options as any) as any;
  }

  /**
   * Test type of the Test issue.
   */
  testType<Sel extends Selection<TestType>>(
    selectorFn: (s: TestType) => [...Sel]
  ): $Field<"testType", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestType()),
    };
    return this.$_select("testType", options as any) as any;
  }

  /**
   * List of Test versions of the Test
   */
  testVersions<
    Args extends VariabledInput<{
      limit: number;
      start?: number | null;
      archived?: boolean | null;
      testTypeId?: string | null;
    }>,
    Sel extends Selection<TestVersionResults>,
  >(
    args: ExactArgNames<
      Args,
      {
        limit: number;
        start?: number | null;
        archived?: boolean | null;
        testTypeId?: string | null;
      }
    >,
    selectorFn: (s: TestVersionResults) => [...Sel]
  ): $Field<"testVersions", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        limit: "Int!",
        start: "Int",
        archived: "Boolean",
        testTypeId: "String",
      },
      args,

      selection: selectorFn(new TestVersionResults()),
    };
    return this.$_select("testVersions", options as any) as any;
  }

  /**
   * Unstructured definition of the Test issue.
   */
  get unstructured(): $Field<"unstructured", string | null> {
    return this.$_select("unstructured") as any;
  }

  /**
   * Version id of the Test issue.
   */
  get versionId(): $Field<"versionId", number | null> {
    return this.$_select("versionId") as any;
  }

  /**
   * Warnings generated while expanding the test steps.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Expanded test step type
 */
export class ExpandedStep extends $Base<"ExpandedStep"> {
  constructor() {
    super("ExpandedStep");
  }

  /**
   * Action of the Step.
   */
  get action(): $Field<"action", string | null> {
    return this.$_select("action") as any;
  }

  /**
   * Attachments of the Step.
   */
  attachments<Sel extends Selection<Attachment>>(
    selectorFn: (s: Attachment) => [...Sel]
  ): $Field<"attachments", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Attachment()),
    };
    return this.$_select("attachments", options as any) as any;
  }

  /**
   * The issue id of the called test with the step
   */
  get calledTestIssueId(): $Field<"calledTestIssueId", string | null> {
    return this.$_select("calledTestIssueId") as any;
  }

  /**
   * Custom Fields of the Step.
   */
  customFields<Sel extends Selection<CustomStepField>>(
    selectorFn: (s: CustomStepField) => [...Sel]
  ): $Field<"customFields", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new CustomStepField()),
    };
    return this.$_select("customFields", options as any) as any;
  }

  /**
   * Data of the Step.
   */
  get data(): $Field<"data", string | null> {
    return this.$_select("data") as any;
  }

  /**
   * Id of the Step.
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * The issue id of the test calling the step
   */
  get parentTestIssueId(): $Field<"parentTestIssueId", string | null> {
    return this.$_select("parentTestIssueId") as any;
  }

  /**
   * Result of the Step.
   */
  get result(): $Field<"result", string | null> {
    return this.$_select("result") as any;
  }
}

/**
 * Test with Version input
 */
export type TestWithVersionInput = {
  issueId?: string | null;
  versionId?: number | null;
};

/**
 * Expanded tests results type
 */
export class ExpandedTestResults extends $Base<"ExpandedTestResults"> {
  constructor() {
    super("ExpandedTestResults");
  }

  /**
   * The maximum amount of Tests to be returned. The maximum is 100.
   */
  get limit(): $Field<"limit", number | null> {
    return this.$_select("limit") as any;
  }

  /**
   * Expanded test issue results.
   */
  results<Sel extends Selection<ExpandedTest>>(
    selectorFn: (s: ExpandedTest) => [...Sel]
  ): $Field<"results", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ExpandedTest()),
    };
    return this.$_select("results", options as any) as any;
  }

  /**
   * The index of the first item to return in the page of results (page offset).
   */
  get start(): $Field<"start", number | null> {
    return this.$_select("start") as any;
  }

  /**
   * Total amount of issues.
   */
  get total(): $Field<"total", number | null> {
    return this.$_select("total") as any;
  }
}

/**
 * Folder Search input
 */
export type PreconditionFolderSearchInput = {
  includeDescendants?: boolean | null;
  path: string;
};

/**
 * Project Settings type
 */
export class ProjectSettings extends $Base<"ProjectSettings"> {
  constructor() {
    super("ProjectSettings");
  }

  /**
   * Defect Issue Types.
   */
  get defectIssueTypes(): $Field<"defectIssueTypes", Readonly<Array<string | null>> | null> {
    return this.$_select("defectIssueTypes") as any;
  }

  /**
   * Project id.
   */
  get projectId(): $Field<"projectId", string | null> {
    return this.$_select("projectId") as any;
  }

  /**
   * Test Coverage Settings.
   */
  testCoverageSettings<Sel extends Selection<ProjectSettingsTestCoverage>>(
    selectorFn: (s: ProjectSettingsTestCoverage) => [...Sel]
  ): $Field<"testCoverageSettings", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ProjectSettingsTestCoverage()),
    };
    return this.$_select("testCoverageSettings", options as any) as any;
  }

  /**
   * Test Environments.
   */
  get testEnvironments(): $Field<"testEnvironments", Readonly<Array<string | null>> | null> {
    return this.$_select("testEnvironments") as any;
  }

  /**
   * Test Run Custom Fields Settings.
   */
  testRunCustomFieldSettings<Sel extends Selection<ProjectSettingsTestRunCustomFields>>(
    selectorFn: (s: ProjectSettingsTestRunCustomFields) => [...Sel]
  ): $Field<"testRunCustomFieldSettings", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ProjectSettingsTestRunCustomFields()),
    };
    return this.$_select("testRunCustomFieldSettings", options as any) as any;
  }

  /**
   * Test Step Settings.
   */
  testStepSettings<Sel extends Selection<ProjectSettingsTestStepSettings>>(
    selectorFn: (s: ProjectSettingsTestStepSettings) => [...Sel]
  ): $Field<"testStepSettings", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ProjectSettingsTestStepSettings()),
    };
    return this.$_select("testStepSettings", options as any) as any;
  }

  /**
   * Test Type Settings.
   */
  testTypeSettings<Sel extends Selection<ProjectSettingsTestType>>(
    selectorFn: (s: ProjectSettingsTestType) => [...Sel]
  ): $Field<"testTypeSettings", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ProjectSettingsTestType()),
    };
    return this.$_select("testTypeSettings", options as any) as any;
  }
}

/**
 * Project Test Coverage Settings type
 */
export class ProjectSettingsTestCoverage extends $Base<"ProjectSettingsTestCoverage"> {
  constructor() {
    super("ProjectSettingsTestCoverage");
  }

  /**
   * Coverable issue type ids
   */
  get coverableIssueTypeIds(): $Field<
    "coverableIssueTypeIds",
    Readonly<Array<string | null>> | null
  > {
    return this.$_select("coverableIssueTypeIds") as any;
  }

  /**
   * Epic - Issues(Stories) relation
   */
  get epicIssuesRelation(): $Field<"epicIssuesRelation", boolean | null> {
    return this.$_select("epicIssuesRelation") as any;
  }

  /**
   * Issue Link Type Direction
   */
  get issueLinkTypeDirection(): $Field<"issueLinkTypeDirection", string | null> {
    return this.$_select("issueLinkTypeDirection") as any;
  }

  /**
   * Issue Link Type Id
   */
  get issueLinkTypeId(): $Field<"issueLinkTypeId", string | null> {
    return this.$_select("issueLinkTypeId") as any;
  }

  /**
   * Issue - Sub-tasks relation
   */
  get issueSubTasksRelation(): $Field<"issueSubTasksRelation", boolean | null> {
    return this.$_select("issueSubTasksRelation") as any;
  }
}

/**
 * Project Test Type Settings type
 */
export class ProjectSettingsTestType extends $Base<"ProjectSettingsTestType"> {
  constructor() {
    super("ProjectSettingsTestType");
  }

  /**
   * Default Test Type Id
   */
  get defaultTestTypeId(): $Field<"defaultTestTypeId", string | null> {
    return this.$_select("defaultTestTypeId") as any;
  }

  /**
   * Test Types
   */
  testTypes<Sel extends Selection<TestType>>(
    selectorFn: (s: TestType) => [...Sel]
  ): $Field<"testTypes", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestType()),
    };
    return this.$_select("testTypes", options as any) as any;
  }
}

/**
 * Project Test Step Settings type
 */
export class ProjectSettingsTestStepSettings extends $Base<"ProjectSettingsTestStepSettings"> {
  constructor() {
    super("ProjectSettingsTestStepSettings");
  }

  /**
   * Fields
   */
  fields<Sel extends Selection<ProjectSettingsTestStepField>>(
    selectorFn: (s: ProjectSettingsTestStepField) => [...Sel]
  ): $Field<"fields", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ProjectSettingsTestStepField()),
    };
    return this.$_select("fields", options as any) as any;
  }
}

/**
 * Project Test Step Field Settings type
 */
export class ProjectSettingsTestStepField extends $Base<"ProjectSettingsTestStepField"> {
  constructor() {
    super("ProjectSettingsTestStepField");
  }

  /**
   * Is the field disabled
   */
  get disabled(): $Field<"disabled", boolean | null> {
    return this.$_select("disabled") as any;
  }

  /**
   * Id
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * Name
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  /**
   * Is the field required
   */
  get required(): $Field<"required", boolean | null> {
    return this.$_select("required") as any;
  }

  /**
   * Type
   */
  get type(): $Field<"type", string | null> {
    return this.$_select("type") as any;
  }

  /**
   * Values
   */
  get values(): $Field<"values", Readonly<Array<string | null>> | null> {
    return this.$_select("values") as any;
  }
}

/**
 * Project Test Run Custom Field Field Settings type
 */
export class ProjectSettingsTestRunCustomFields extends $Base<"ProjectSettingsTestRunCustomFields"> {
  constructor() {
    super("ProjectSettingsTestRunCustomFields");
  }

  /**
   * Fields
   */
  fields<Sel extends Selection<ProjectSettingsTestRunCustomField>>(
    selectorFn: (s: ProjectSettingsTestRunCustomField) => [...Sel]
  ): $Field<"fields", Array<GetOutput<Sel> | null> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new ProjectSettingsTestRunCustomField()),
    };
    return this.$_select("fields", options as any) as any;
  }
}

/**
 * Project Test Run Custom Field Settings type
 */
export class ProjectSettingsTestRunCustomField extends $Base<"ProjectSettingsTestRunCustomField"> {
  constructor() {
    super("ProjectSettingsTestRunCustomField");
  }

  /**
   * Id
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * Name
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  /**
   * Is the field required
   */
  get required(): $Field<"required", boolean | null> {
    return this.$_select("required") as any;
  }

  /**
   * Type
   */
  get type(): $Field<"type", string | null> {
    return this.$_select("type") as any;
  }

  /**
   * Values
   */
  get values(): $Field<"values", Readonly<Array<string | null>> | null> {
    return this.$_select("values") as any;
  }
}

/**
 * Issue Link Type type
 */
export class IssueLinkType extends $Base<"IssueLinkType"> {
  constructor() {
    super("IssueLinkType");
  }

  /**
   * Id of Issue Link Type
   */
  get id(): $Field<"id", string | null> {
    return this.$_select("id") as any;
  }

  /**
   * Name of Issue Link Type
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }
}

export class Mutation extends $Base<"Mutation"> {
  constructor() {
    super("Mutation");
  }

  /**
 * Mutation used to add defects to a Test Run.
===
The mutation below adds 2 defects to the Test Run.
<pre>
mutation {
    <b>addDefectsToTestRun</b>( id: "5acc7ab0a3fe1b6fcdc3c737", issues: ["XRAY-1234", "12345"]) {
        addedDefects
        warnings
    }
}
</pre>
===
 */
  addDefectsToTestRun<
    Args extends VariabledInput<{
      id: string;
      issues: Readonly<Array<string | null>>;
    }>,
    Sel extends Selection<AddDefectsResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        id: string;
        issues: Readonly<Array<string | null>>;
      }
    >,
    selectorFn: (s: AddDefectsResult) => [...Sel]
  ): $Field<"addDefectsToTestRun", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        id: "String!",
        issues: "[String]!",
      },
      args,

      selection: selectorFn(new AddDefectsResult()),
    };
    return this.$_select("addDefectsToTestRun", options as any) as any;
  }

  /**
 * Mutation used to add defects to a Test Run Step.
===
The mutation below adds 2 defects to the Test Run Step.
<pre>
mutation {
    <b>addDefectsToTestRunStep</b>(
        testRunId: "5e8489c05f200f3cd45bbaf0",
        stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
        issues: ["XRAY-1234", "12345"]
    ) {
        addedDefects
        warnings
    }
}
</pre>
===
 */
  addDefectsToTestRunStep<
    Args extends VariabledInput<{
      testRunId: string;
      stepId: string;
      issues?: Readonly<Array<string | null>> | null;
      iterationRank?: string | null;
    }>,
    Sel extends Selection<AddDefectsResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        testRunId: string;
        stepId: string;
        issues?: Readonly<Array<string | null>> | null;
        iterationRank?: string | null;
      }
    >,
    selectorFn: (s: AddDefectsResult) => [...Sel]
  ): $Field<"addDefectsToTestRunStep", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        testRunId: "String!",
        stepId: "String!",
        issues: "[String]",
        iterationRank: "String",
      },
      args,

      selection: selectorFn(new AddDefectsResult()),
    };
    return this.$_select("addDefectsToTestRunStep", options as any) as any;
  }

  /**
 * Mutation used to add evidence to a Test Run.
===
The mutation below adds an evidence to the Test Run.
<pre>
mutation {
    <b>addEvidenceToTestRun</b>(
        id: "5acc7ab0a3fe1b6fcdc3c737",
        evidence: [
            {
                filename: "evidence.txt"
                mimeType: "text/plain"
                data: "SGVsbG8gV29ybGQ="
            }
        ]
    ) {
        addedEvidence
        warnings
    }
}
</pre>
===
 */
  addEvidenceToTestRun<
    Args extends VariabledInput<{
      id: string;
      evidence: Readonly<Array<AttachmentDataInput | null>>;
    }>,
    Sel extends Selection<AddEvidenceResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        id: string;
        evidence: Readonly<Array<AttachmentDataInput | null>>;
      }
    >,
    selectorFn: (s: AddEvidenceResult) => [...Sel]
  ): $Field<"addEvidenceToTestRun", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        id: "String!",
        evidence: "[AttachmentDataInput]!",
      },
      args,

      selection: selectorFn(new AddEvidenceResult()),
    };
    return this.$_select("addEvidenceToTestRun", options as any) as any;
  }

  /**
 * Mutation used to add evidence to a Test Run Step.
===
The mutation below adds an evidence to the Test Run Step.
<pre>
mutation {
    <b>addEvidenceToTestRunStep</b>(
        testRunId: "5e8489c05f200f3cd45bbaf0",
        stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
        evidence: [
            {
                filename: "evidence.txt"
                mimeType: "text/plain"
                data: "SGVsbG8gV29ybGQ="
            }
        ]
    ) {
        addedEvidence
        warnings
    }
}
</pre>
===
 */
  addEvidenceToTestRunStep<
    Args extends VariabledInput<{
      testRunId: string;
      stepId: string;
      evidence?: Readonly<Array<AttachmentDataInput | null>> | null;
      iterationRank?: string | null;
    }>,
    Sel extends Selection<AddEvidenceResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        testRunId: string;
        stepId: string;
        evidence?: Readonly<Array<AttachmentDataInput | null>> | null;
        iterationRank?: string | null;
      }
    >,
    selectorFn: (s: AddEvidenceResult) => [...Sel]
  ): $Field<"addEvidenceToTestRunStep", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        testRunId: "String!",
        stepId: "String!",
        evidence: "[AttachmentDataInput]",
        iterationRank: "String",
      },
      args,

      selection: selectorFn(new AddEvidenceResult()),
    };
    return this.$_select("addEvidenceToTestRunStep", options as any) as any;
  }

  /**
 * Mutation used to add issues to a Folder.
===
The mutation below will add issues to a Folder.
<pre>
mutation {
    <b>addIssuesToFolder</b>(
        projectId: "10000",
        path: "/generic",
        issueIds: ["10002","12324","12345"]
    ) {
        folder {
            name
            path
            issuesCount
        }
        warnings
    }
}
</pre>
===
 */
  addIssuesToFolder<
    Args extends VariabledInput<{
      projectId: string;
      path: string;
      issueIds: Readonly<Array<string | null>>;
      index?: number | null;
    }>,
    Sel extends Selection<ActionFolderResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        projectId: string;
        path: string;
        issueIds: Readonly<Array<string | null>>;
        index?: number | null;
      }
    >,
    selectorFn: (s: ActionFolderResult) => [...Sel]
  ): $Field<"addIssuesToFolder", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        projectId: "String!",
        path: "String!",
        issueIds: "[String]!",
        index: "Int",
      },
      args,

      selection: selectorFn(new ActionFolderResult()),
    };
    return this.$_select("addIssuesToFolder", options as any) as any;
  }

  /**
 * Mutation used to associate Preconditions to the Test.
<b>Note</b>: The preconditions to be associated with the Test must be of the same Test Type of the Test.
===
The mutation below will associate the precondition with issue id "54321" to the test "12345".
<pre>
mutation {
    <b>addPreconditionsToTest</b>(
        issueId: "12345",
        preconditionIssueIds: ["54321"]
    ) {
        addedPreconditions
        warning
    }
}
</pre>
===
===
The mutation below will associate the precondition with issue id "54321" to the version 3 of the Test "12345".
<pre>
mutation {
    <b>addPreconditionsToTest</b>(
        issueId: "12345",
        versionId: 3,
        preconditionIssueIds: ["54321"]
    ) {
        addedPreconditions
        warning
    }
}
</pre>
===
 */
  addPreconditionsToTest<
    Args extends VariabledInput<{
      issueId: string;
      versionId?: number | null;
      preconditionIssueIds: Readonly<Array<string | null>>;
    }>,
    Sel extends Selection<AddPreconditionsResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        versionId?: number | null;
        preconditionIssueIds: Readonly<Array<string | null>>;
      }
    >,
    selectorFn: (s: AddPreconditionsResult) => [...Sel]
  ): $Field<"addPreconditionsToTest", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        versionId: "Int",
        preconditionIssueIds: "[String]!",
      },
      args,

      selection: selectorFn(new AddPreconditionsResult()),
    };
    return this.$_select("addPreconditionsToTest", options as any) as any;
  }

  /**
 * Mutation used to add Test Environments to the Test Execution.
===
The mutation below will add the test Environments "android" and "ios" to the Test execution "12345".
<pre>
mutation {
    <b>addTestEnvironmentsToTestExecution</b>(
        issueId: "12345",
        testEnvironments: ["android", "ios"]
    ) {
        associatedTestEnvironments
        createdTestEnvironments
        warning
    }
}
</pre>
===
 */
  addTestEnvironmentsToTestExecution<
    Args extends VariabledInput<{
      issueId: string;
      testEnvironments: Readonly<Array<string | null>>;
    }>,
    Sel extends Selection<AddTestEnvironmentsResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testEnvironments: Readonly<Array<string | null>>;
      }
    >,
    selectorFn: (s: AddTestEnvironmentsResult) => [...Sel]
  ): $Field<"addTestEnvironmentsToTestExecution", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testEnvironments: "[String]!",
      },
      args,

      selection: selectorFn(new AddTestEnvironmentsResult()),
    };
    return this.$_select("addTestEnvironmentsToTestExecution", options as any) as any;
  }

  /**
 * Mutation used to associate Test Executions to the Test.
===
The mutation below will associate the Test Execution with issue id "54321" to the Test "12345".
<pre>
mutation {
    <b>addTestExecutionsToTest</b>(
        issueId: "12345",
        testExecIssueIds: ["54321"]
    ) {
        addedTestExecutions
        warning
    }
}
</pre>
===
===
The mutation below will associate the Test Execution with issue id "54321" to version 3 of the Test "12345".
<pre>
mutation {
    <b>addTestExecutionsToTest</b>(
        issueId: "12345",
        versionId: 3,
        testExecIssueIds: ["54321"]
    ) {
        addedTestExecutions
        warning
    }
}
</pre>
===
 */
  addTestExecutionsToTest<
    Args extends VariabledInput<{
      issueId: string;
      versionId?: number | null;
      testExecIssueIds: Readonly<Array<string | null>>;
    }>,
    Sel extends Selection<AddTestExecutionsResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        versionId?: number | null;
        testExecIssueIds: Readonly<Array<string | null>>;
      }
    >,
    selectorFn: (s: AddTestExecutionsResult) => [...Sel]
  ): $Field<"addTestExecutionsToTest", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        versionId: "Int",
        testExecIssueIds: "[String]!",
      },
      args,

      selection: selectorFn(new AddTestExecutionsResult()),
    };
    return this.$_select("addTestExecutionsToTest", options as any) as any;
  }

  /**
 * Mutation used to associate Test Executions to the Test Plan.
===
The mutation below will associate the Test Execution with issue id "54321" to the test Plan "12345".
<pre>
mutation {
    <b>addTestExecutionsToTestPlan</b>(
        issueId: "12345",
        testExecIssueIds: ["54321"]
    ) {
        addedTestExecutions
        warning
    }
}
</pre>
===
 */
  addTestExecutionsToTestPlan<
    Args extends VariabledInput<{
      issueId: string;
      testExecIssueIds: Readonly<Array<string | null>>;
    }>,
    Sel extends Selection<AddTestExecutionsResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testExecIssueIds: Readonly<Array<string | null>>;
      }
    >,
    selectorFn: (s: AddTestExecutionsResult) => [...Sel]
  ): $Field<"addTestExecutionsToTestPlan", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testExecIssueIds: "[String]!",
      },
      args,

      selection: selectorFn(new AddTestExecutionsResult()),
    };
    return this.$_select("addTestExecutionsToTestPlan", options as any) as any;
  }

  /**
 * Mutation used to associate Test Plans to the Test.
===
The mutation below will associate the Test Plan with issue id "54321" to the test "12345".
<pre>
mutation {
    <b>addTestPlansToTest</b>(
        issueId: "12345",
        testPlanIssueIds: ["54321"]
    ) {
        addedTestPlans
        warning
    }
}
</pre>
===
 */
  addTestPlansToTest<
    Args extends VariabledInput<{
      issueId: string;
      testPlanIssueIds: Readonly<Array<string | null>>;
    }>,
    Sel extends Selection<AddTestPlansResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testPlanIssueIds: Readonly<Array<string | null>>;
      }
    >,
    selectorFn: (s: AddTestPlansResult) => [...Sel]
  ): $Field<"addTestPlansToTest", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testPlanIssueIds: "[String]!",
      },
      args,

      selection: selectorFn(new AddTestPlansResult()),
    };
    return this.$_select("addTestPlansToTest", options as any) as any;
  }

  /**
 * Mutation used to associate Test Sets to the Test.
===
The mutation below will associate the test set with issue id "54321" to the test "12345".
<pre>
mutation {
    <b>addTestSetsToTest</b>(
        issueId: "12345",
        testSetIssueIds: ["54321"]
    ) {
        addedTestSets
        warning
    }
}
</pre>
===
 */
  addTestSetsToTest<
    Args extends VariabledInput<{
      issueId: string;
      testSetIssueIds: Readonly<Array<string | null>>;
    }>,
    Sel extends Selection<AddTestSetsResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testSetIssueIds: Readonly<Array<string | null>>;
      }
    >,
    selectorFn: (s: AddTestSetsResult) => [...Sel]
  ): $Field<"addTestSetsToTest", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testSetIssueIds: "[String]!",
      },
      args,

      selection: selectorFn(new AddTestSetsResult()),
    };
    return this.$_select("addTestSetsToTest", options as any) as any;
  }

  /**
 * Mutation used to add a Step to a Test.
===
The mutation below will add a new Step to the test with id "12345".
<pre>
mutation {
    <b>addTestStep</b>(
        issueId: "12345",
        step: {
            action: "Use Xray Cloud Rest Api to add a new Step to the Test",
            result: "Step was added to the Test",
            customFields: [{id:"5ddc0e585da9670010e608dc", value:"Tokyo"}]
        }
    ) {
        id
        action
        data
        result
    }
}
</pre>
===
===
The mutation below will add a new Step to the version 3 of the Test with id "12345".
<pre>
mutation {
    <b>addTestStep</b>(
        issueId: "12345",
        versionId: 3,
        step: {
            action: "Use Xray Cloud Rest Api to add a new Step to the Test",
            result: "Step was added to the Test",
            customFields: [{id:"5ddc0e585da9670010e608dc", value:"Tokyo"}]
        }
    ) {
        id
        action
        data
        result
    }
}
</pre>
===
 */
  addTestStep<
    Args extends VariabledInput<{
      issueId: string;
      versionId?: number | null;
      step: CreateStepInput;
    }>,
    Sel extends Selection<Step>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        versionId?: number | null;
        step: CreateStepInput;
      }
    >,
    selectorFn: (s: Step) => [...Sel]
  ): $Field<"addTestStep", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        versionId: "Int",
        step: "CreateStepInput!",
      },
      args,

      selection: selectorFn(new Step()),
    };
    return this.$_select("addTestStep", options as any) as any;
  }

  /**
 * Mutation used to add tests to a Folder.
===
The mutation below will add tests to a Folder.
<pre>
mutation {
    <b>addTestsToFolder</b>(
        projectId: "10000",
        path: "/generic",
        testIssueIds: ["10002","12324","12345"]
    ) {
        folder {
            name
            path
            testsCount
        }
        warnings
    }
}
</pre>
===
 */
  addTestsToFolder<
    Args extends VariabledInput<{
      projectId?: string | null;
      testPlanId?: string | null;
      path: string;
      testIssueIds: Readonly<Array<string | null>>;
      index?: number | null;
    }>,
    Sel extends Selection<ActionFolderResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        projectId?: string | null;
        testPlanId?: string | null;
        path: string;
        testIssueIds: Readonly<Array<string | null>>;
        index?: number | null;
      }
    >,
    selectorFn: (s: ActionFolderResult) => [...Sel]
  ): $Field<"addTestsToFolder", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        projectId: "String",
        testPlanId: "String",
        path: "String!",
        testIssueIds: "[String]!",
        index: "Int",
      },
      args,

      selection: selectorFn(new ActionFolderResult()),
    };
    return this.$_select("addTestsToFolder", options as any) as any;
  }

  /**
 * Mutation used to associate Tests to the Precondition. One of <b>testIssueIds</b> or <b>tests</b> is required.
<b>Note</b>: The Tests to be associated with the Precondition must be of the same Test Type of the Precondition.
===
The mutation below will associate the Test with issue id "54321" to the Precondition "12345"
<pre>
mutation {
    <b>addTestsToPrecondition</b>(
        issueId: "12345",
        testIssueIds: ["54321"]
    ) {
        addedTests
        warning
    }
}
</pre>
===
===
The mutation below will associate the version 2 of Test "54321" and the version 3 of Test "67890" to the Precondition "12345"
<pre>
mutation {
    <b>addTestsToPrecondition</b>(
        issueId: "12345",
        tests: [{ issueId: "54321", versionId: 2 }, { issueId: "67890", versionId: 3 }]
    ) {
        addedTests
        warning
    }
}
</pre>
===
 */
  addTestsToPrecondition<
    Args extends VariabledInput<{
      issueId: string;
      testIssueIds?: Readonly<Array<string | null>> | null;
      tests?: Readonly<Array<TestWithVersionInput | null>> | null;
    }>,
    Sel extends Selection<AddTestsResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testIssueIds?: Readonly<Array<string | null>> | null;
        tests?: Readonly<Array<TestWithVersionInput | null>> | null;
      }
    >,
    selectorFn: (s: AddTestsResult) => [...Sel]
  ): $Field<"addTestsToPrecondition", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testIssueIds: "[String]",
        tests: "[TestWithVersionInput]",
      },
      args,

      selection: selectorFn(new AddTestsResult()),
    };
    return this.$_select("addTestsToPrecondition", options as any) as any;
  }

  /**
 * Mutation used to associate Tests to the Test Execution. One of <b>testIssueIds</b> or <b>tests</b> is required.
===
The mutation below will associate the test with issue id "54321" to the Test execution "12345".
<pre>
mutation {
    <b>addTestsToTestExecution</b>(
        issueId: "12345",
        testIssueIds: ["54321"]
    ) {
        addedTests
        warning
    }
}
</pre>
===
 */
  addTestsToTestExecution<
    Args extends VariabledInput<{
      issueId: string;
      testIssueIds?: Readonly<Array<string | null>> | null;
      tests?: Readonly<Array<TestWithVersionInput | null>> | null;
    }>,
    Sel extends Selection<AddTestsResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testIssueIds?: Readonly<Array<string | null>> | null;
        tests?: Readonly<Array<TestWithVersionInput | null>> | null;
      }
    >,
    selectorFn: (s: AddTestsResult) => [...Sel]
  ): $Field<"addTestsToTestExecution", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testIssueIds: "[String]",
        tests: "[TestWithVersionInput]",
      },
      args,

      selection: selectorFn(new AddTestsResult()),
    };
    return this.$_select("addTestsToTestExecution", options as any) as any;
  }

  /**
 * Mutation used to associate Tests to the Test Plan.
===
The mutation below will associate the test with issue id "54321" to the Test Plan "12345".
<pre>
mutation {
    <b>addTestsToTestPlan</b>(
        issueId: "12345",
        testIssueIds: ["54321"]
    ) {
        addedTests
        warning
    }
}
</pre>
===
 */
  addTestsToTestPlan<
    Args extends VariabledInput<{
      issueId: string;
      testIssueIds: Readonly<Array<string | null>>;
    }>,
    Sel extends Selection<AddTestsResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testIssueIds: Readonly<Array<string | null>>;
      }
    >,
    selectorFn: (s: AddTestsResult) => [...Sel]
  ): $Field<"addTestsToTestPlan", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testIssueIds: "[String]!",
      },
      args,

      selection: selectorFn(new AddTestsResult()),
    };
    return this.$_select("addTestsToTestPlan", options as any) as any;
  }

  /**
 * Mutation used to associate Tests to the Test Set.
===
The mutation below will associate the test with issue id "54321" to the Test Set "12345".
<pre>
mutation {
    <b>addTestsToTestSet</b>(
        issueId: "12345",
        testIssueIds: ["54321"]
    ) {
        addedTests
        warning
    }
}
</pre>
===
 */
  addTestsToTestSet<
    Args extends VariabledInput<{
      issueId: string;
      testIssueIds: Readonly<Array<string | null>>;
    }>,
    Sel extends Selection<AddTestsResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testIssueIds: Readonly<Array<string | null>>;
      }
    >,
    selectorFn: (s: AddTestsResult) => [...Sel]
  ): $Field<"addTestsToTestSet", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testIssueIds: "[String]!",
      },
      args,

      selection: selectorFn(new AddTestsResult()),
    };
    return this.$_select("addTestsToTestSet", options as any) as any;
  }

  /**
 * Mutation used to create a new Folder.
===
The mutation below will create a new Folder.
<pre>
mutation {
    <b>createFolder</b>(
        projectId: "10000",
        path: "/generic"
    ) {
        folder {
            name
            path
            testsCount
        }
        warnings
    }
}
</pre>
===
===
The mutation below will create a new Folder and add tests to it.
<pre>
mutation {
    <b>createFolder</b>(
        projectId: "10000",
        path: "/generic",
        testIssueIds: ["10002","12324","12345"]
    ) {
        folder {
            name
            path
            testsCount
        }
        warnings
    }
}
</pre>
===
===
The mutation below will create a new Folder and add tests and/or preconditions to it.
<pre>
mutation {
    <b>createFolder</b>(
        projectId: "10000",
        path: "/generic",
        issueIds: ["10002","12324","12345"]
    ) {
        folder {
            name
            path
            testsCount
            issuesCount
            preconditionsCount
        }
        warnings
    }
}
</pre>
<b>Note</b>: Use createFolder with <b>testIssueIds</b> (in which all ids must be from Tests)
OR with <b>issueIds</b> (which can be eiter Test ids and/or Precondition ids), but not with both.
===
 */
  createFolder<
    Args extends VariabledInput<{
      projectId?: string | null;
      testPlanId?: string | null;
      path: string;
      testIssueIds?: Readonly<Array<string | null>> | null;
      issueIds?: Readonly<Array<string | null>> | null;
    }>,
    Sel extends Selection<ActionFolderResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        projectId?: string | null;
        testPlanId?: string | null;
        path: string;
        testIssueIds?: Readonly<Array<string | null>> | null;
        issueIds?: Readonly<Array<string | null>> | null;
      }
    >,
    selectorFn: (s: ActionFolderResult) => [...Sel]
  ): $Field<"createFolder", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        projectId: "String",
        testPlanId: "String",
        path: "String!",
        testIssueIds: "[String]",
        issueIds: "[String]",
      },
      args,

      selection: selectorFn(new ActionFolderResult()),
    };
    return this.$_select("createFolder", options as any) as any;
  }

  /**
 * Mutation used to create a new Precondition.
===
The mutation below will create a new Precondition.
<pre>
mutation {
    <b>createPrecondition</b>(
        preconditionType: { name: "Generic" }
        definition: "Turn on calculator."
        jira: {
            fields: { summary:"Turn on calculator", project: {key: "CALC"} }
        }
    ) {
        precondition {
            issueId
            preconditionType {
                name
            }
            definition
            jira(fields: ["key"])
        }
        warnings
    }
}
</pre>
===
 */
  createPrecondition<
    Args extends VariabledInput<{
      preconditionType?: UpdatePreconditionTypeInput | null;
      definition?: string | null;
      testIssueIds?: Readonly<Array<string | null>> | null;
      tests?: Readonly<Array<TestWithVersionInput | null>> | null;
      folderPath?: string | null;
      jira: JSON;
    }>,
    Sel extends Selection<CreatePreconditionResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        preconditionType?: UpdatePreconditionTypeInput | null;
        definition?: string | null;
        testIssueIds?: Readonly<Array<string | null>> | null;
        tests?: Readonly<Array<TestWithVersionInput | null>> | null;
        folderPath?: string | null;
        jira: JSON;
      }
    >,
    selectorFn: (s: CreatePreconditionResult) => [...Sel]
  ): $Field<"createPrecondition", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        preconditionType: "UpdatePreconditionTypeInput",
        definition: "String",
        testIssueIds: "[String]",
        tests: "[TestWithVersionInput]",
        folderPath: "String",
        jira: "JSON!",
      },
      args,

      selection: selectorFn(new CreatePreconditionResult()),
    };
    return this.$_select("createPrecondition", options as any) as any;
  }

  /**
 * Mutation used to create a new Test.
===
The mutation below will create a new Test.
<pre>
mutation {
    <b>createTest</b>(
        testType: { name: "Generic" },
        unstructured: "Perform exploratory tests on calculator.",
        jira: {
            fields: { summary:"Exploratory Test", project: {key: "CALC"} }
        }
    ) {
        test {
            issueId
            testType {
                name
            }
            unstructured
            jira(fields: ["key"])
        }
        warnings
    }
}
</pre>
=== ===
The mutation below will create a new Test.
<pre>
mutation {
    <b>createTest</b>(
        testType: { name: "Manual" },
        steps: [
            {
                action: "Create first example step",
                result: "First step was created"
            },
            {
                action: "Create second example step with data",
                data: "Data for the step",
                result: "Second step was created with data"
            }
        ],
        jira: {
            fields: { summary:"Exploratory Test", project: {key: "CALC"} }
        }
    ) {
        test {
            issueId
            testType {
                name
            }
            steps {
                action
                data
                result
            }
            jira(fields: ["key"])
        }
        warnings
    }
}
</pre>
===
 */
  createTest<
    Args extends VariabledInput<{
      testType?: UpdateTestTypeInput | null;
      steps?: Readonly<Array<CreateStepInput | null>> | null;
      unstructured?: string | null;
      gherkin?: string | null;
      preconditionIssueIds?: Readonly<Array<string | null>> | null;
      folderPath?: string | null;
      jira: JSON;
    }>,
    Sel extends Selection<CreateTestResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        testType?: UpdateTestTypeInput | null;
        steps?: Readonly<Array<CreateStepInput | null>> | null;
        unstructured?: string | null;
        gherkin?: string | null;
        preconditionIssueIds?: Readonly<Array<string | null>> | null;
        folderPath?: string | null;
        jira: JSON;
      }
    >,
    selectorFn: (s: CreateTestResult) => [...Sel]
  ): $Field<"createTest", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        testType: "UpdateTestTypeInput",
        steps: "[CreateStepInput]",
        unstructured: "String",
        gherkin: "String",
        preconditionIssueIds: "[String]",
        folderPath: "String",
        jira: "JSON!",
      },
      args,

      selection: selectorFn(new CreateTestResult()),
    };
    return this.$_select("createTest", options as any) as any;
  }

  /**
 * Mutation used to create a new Test Execution.
===
The mutation below will create a new Test Execution.
<pre>
mutation {
    <b>createTestExecution</b>(
        testIssueIds: ["54321"]
        testEnvironments: ["android"]
        jira: {
            fields: { summary: "Test Execution for CALC-123", project: {key: "CALC"} }
        }
    ) {
        testExecution {
            issueId
            jira(fields: ["key"])
        }
        warnings
        createdTestEnvironments
    }
}
</pre>
===
 */
  createTestExecution<
    Args extends VariabledInput<{
      testIssueIds?: Readonly<Array<string | null>> | null;
      tests?: Readonly<Array<TestWithVersionInput | null>> | null;
      testEnvironments?: Readonly<Array<string | null>> | null;
      jira: JSON;
    }>,
    Sel extends Selection<CreateTestExecutionResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        testIssueIds?: Readonly<Array<string | null>> | null;
        tests?: Readonly<Array<TestWithVersionInput | null>> | null;
        testEnvironments?: Readonly<Array<string | null>> | null;
        jira: JSON;
      }
    >,
    selectorFn: (s: CreateTestExecutionResult) => [...Sel]
  ): $Field<"createTestExecution", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        testIssueIds: "[String]",
        tests: "[TestWithVersionInput]",
        testEnvironments: "[String]",
        jira: "JSON!",
      },
      args,

      selection: selectorFn(new CreateTestExecutionResult()),
    };
    return this.$_select("createTestExecution", options as any) as any;
  }

  /**
 * Mutation used to create a new Test Plan.
===
The mutation below will create a new Test Plan.
<pre>
mutation {
    <b>createTestPlan</b>(
        testIssueIds: ["54321"]
        jira: {
            fields: { summary: "Test Plan for v1.0", project: {key: "CALC"} }
        }
    ) {
        testPlan {
            issueId
            jira(fields: ["key"])
        }
        warnings
    }
}
</pre>
===
 */
  createTestPlan<
    Args extends VariabledInput<{
      savedFilter?: string | null;
      testIssueIds?: Readonly<Array<string | null>> | null;
      jira: JSON;
    }>,
    Sel extends Selection<CreateTestPlanResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        savedFilter?: string | null;
        testIssueIds?: Readonly<Array<string | null>> | null;
        jira: JSON;
      }
    >,
    selectorFn: (s: CreateTestPlanResult) => [...Sel]
  ): $Field<"createTestPlan", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        savedFilter: "String",
        testIssueIds: "[String]",
        jira: "JSON!",
      },
      args,

      selection: selectorFn(new CreateTestPlanResult()),
    };
    return this.$_select("createTestPlan", options as any) as any;
  }

  /**
 * Mutation used to create a new Test Set.
===
The mutation below will create a new Test Set.
<pre>
mutation {
    <b>createTestSet</b>(
        testIssueIds: ["54321"]
        jira: {
            fields: { summary: "Test Set for Generic Tests", project: {key: "CALC"} }
        }
    ) {
        testSet {
            issueId
            jira(fields: ["key"])
        }
        warnings
    }
}
</pre>
===
 */
  createTestSet<
    Args extends VariabledInput<{
      testIssueIds?: Readonly<Array<string | null>> | null;
      jira: JSON;
    }>,
    Sel extends Selection<CreateTestSetResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        testIssueIds?: Readonly<Array<string | null>> | null;
        jira: JSON;
      }
    >,
    selectorFn: (s: CreateTestSetResult) => [...Sel]
  ): $Field<"createTestSet", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        testIssueIds: "[String]",
        jira: "JSON!",
      },
      args,

      selection: selectorFn(new CreateTestSetResult()),
    };
    return this.$_select("createTestSet", options as any) as any;
  }

  /**
 * Mutation used to delete a Folder.
===
The mutation below will delete a Folder.
<pre>
mutation {
    <b>deleteFolder</b>(
        projectId: "10000",
        path: "/generic"
    )
}
</pre>
===
 */
  deleteFolder<
    Args extends VariabledInput<{
      projectId?: string | null;
      testPlanId?: string | null;
      path: string;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        projectId?: string | null;
        testPlanId?: string | null;
        path: string;
      }
    >
  ): $Field<"deleteFolder", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        projectId: "String",
        testPlanId: "String",
        path: "String!",
      },
      args,
    };
    return this.$_select("deleteFolder", options as any) as any;
  }

  /**
 * Mutation used to delete a Precondition
===
The mutation below will delete the Precondition with issue id "12345"
<pre>
mutation {
    <b>deletePrecondition</b>(issueId: "12345")
}
</pre>
===
 */
  deletePrecondition<
    Args extends VariabledInput<{
      issueId: string;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
      }
    >
  ): $Field<"deletePrecondition", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
      },
      args,
    };
    return this.$_select("deletePrecondition", options as any) as any;
  }

  /**
 * Mutation used to delete a Test.
===
The mutation below will delete the Test with issue id "12345".
<pre>
mutation {
    <b>deleteTest</b>(issueId: "12345")
}
</pre>
===
 */
  deleteTest<
    Args extends VariabledInput<{
      issueId: string;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
      }
    >
  ): $Field<"deleteTest", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
      },
      args,
    };
    return this.$_select("deleteTest", options as any) as any;
  }

  /**
 * Mutation used to delete a Test Execution.
===
The mutation below will delete the Test Execution with id "12345".
<pre>
mutation {
    <b>deleteTestExecution</b>(issueId: "12345")
}
</pre>
===
 */
  deleteTestExecution<
    Args extends VariabledInput<{
      issueId: string;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
      }
    >
  ): $Field<"deleteTestExecution", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
      },
      args,
    };
    return this.$_select("deleteTestExecution", options as any) as any;
  }

  /**
 * Mutation used to delete a Test Plan.
===
The mutation below will delete the Test Plan with id "12345".
<pre>
mutation {
    <b>deleteTestPlan</b>(issueId: "12345")
}
</pre>
===
 */
  deleteTestPlan<
    Args extends VariabledInput<{
      issueId: string;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
      }
    >
  ): $Field<"deleteTestPlan", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
      },
      args,
    };
    return this.$_select("deleteTestPlan", options as any) as any;
  }

  /**
 * Mutation used to delete a Test Set
===
The mutation below will delete the Test Set with issue id "12345".
<pre>
mutation {
    <b>deleteTestSet</b>(issueId: "12345")
}
</pre>
===
 */
  deleteTestSet<
    Args extends VariabledInput<{
      issueId: string;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
      }
    >
  ): $Field<"deleteTestSet", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
      },
      args,
    };
    return this.$_select("deleteTestSet", options as any) as any;
  }

  /**
 * Mutation used to move a Folder.
===
The mutation below will move a Folder.
<pre>
mutation {
    <b>moveFolder</b>(
        projectId: "10000",
        path: "/generic",
        destinationPath: "/testType"
    ) {
        folder {
            name
            path
            testsCount
        }
        warnings
    }
}
</pre>
===
 */
  moveFolder<
    Args extends VariabledInput<{
      projectId?: string | null;
      testPlanId?: string | null;
      path: string;
      destinationPath: string;
      index?: number | null;
    }>,
    Sel extends Selection<ActionFolderResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        projectId?: string | null;
        testPlanId?: string | null;
        path: string;
        destinationPath: string;
        index?: number | null;
      }
    >,
    selectorFn: (s: ActionFolderResult) => [...Sel]
  ): $Field<"moveFolder", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        projectId: "String",
        testPlanId: "String",
        path: "String!",
        destinationPath: "String!",
        index: "Int",
      },
      args,

      selection: selectorFn(new ActionFolderResult()),
    };
    return this.$_select("moveFolder", options as any) as any;
  }

  /**
 * Mutation used to remove all Steps from a Test.
===
The mutation below removes all the Steps from test with id "12345".
<pre>
mutation {
    <b>removeAllTestSteps</b>(
        issueId: "12345",
    )
}
</pre>
===
===
The mutation below removes all the Steps from the version 3 of the Test with id "12345".
<pre>
mutation {
    <b>removeAllTestSteps</b>(
        issueId: "12345",
        versionId: 3
    )
}
</pre>
===
 */
  removeAllTestSteps<
    Args extends VariabledInput<{
      issueId: string;
      versionId?: number | null;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        versionId?: number | null;
      }
    >
  ): $Field<"removeAllTestSteps", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        versionId: "Int",
      },
      args,
    };
    return this.$_select("removeAllTestSteps", options as any) as any;
  }

  /**
 * Mutation used to remove defects from a Test Run.
===
The mutation below removes 2 defects from the Test Run.
<pre>
mutation {
    <b>removeDefectsFromTestRun</b>( id: "5acc7ab0a3fe1b6fcdc3c737", issues: ["XRAY-1234", "12345"])
}
</pre>
===
 */
  removeDefectsFromTestRun<
    Args extends VariabledInput<{
      id: string;
      issues: Readonly<Array<string | null>>;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        id: string;
        issues: Readonly<Array<string | null>>;
      }
    >
  ): $Field<"removeDefectsFromTestRun", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        id: "String!",
        issues: "[String]!",
      },
      args,
    };
    return this.$_select("removeDefectsFromTestRun", options as any) as any;
  }

  /**
 * Mutation used to remove defects from a Test Run.
===
The mutation below removes 2 defects from the Test Run.
<pre>
mutation {
    <b>removeDefectsFromTestRunStep</b>(
        testRunId: "5e8489c05f200f3cd45bbaf0",
        stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
        issues: ["XRAY-1234", "12345"]
    ) {
        removedDefects
        warnings
    }
}
</pre>
===
 */
  removeDefectsFromTestRunStep<
    Args extends VariabledInput<{
      testRunId: string;
      stepId: string;
      issues: Readonly<Array<string | null>>;
      iterationRank?: string | null;
    }>,
    Sel extends Selection<RemoveDefectsResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        testRunId: string;
        stepId: string;
        issues: Readonly<Array<string | null>>;
        iterationRank?: string | null;
      }
    >,
    selectorFn: (s: RemoveDefectsResult) => [...Sel]
  ): $Field<"removeDefectsFromTestRunStep", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        testRunId: "String!",
        stepId: "String!",
        issues: "[String]!",
        iterationRank: "String",
      },
      args,

      selection: selectorFn(new RemoveDefectsResult()),
    };
    return this.$_select("removeDefectsFromTestRunStep", options as any) as any;
  }

  /**
 * Mutation used to remove evidence from a Test Run.
===
The mutation below removes an evidence from the Test Run.
<pre>
mutation {
    <b>removeEvidenceFromTestRun</b>(
        id: "5acc7ab0a3fe1b6fcdc3c737",
        evidenceFilenames: ["evidence.txt"]
    ) {
        removedEvidence
        warnings
    }
}
</pre>
===
 */
  removeEvidenceFromTestRun<
    Args extends VariabledInput<{
      id: string;
      evidenceIds?: Readonly<Array<string | null>> | null;
      evidenceFilenames?: Readonly<Array<string | null>> | null;
    }>,
    Sel extends Selection<RemoveEvidenceResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        id: string;
        evidenceIds?: Readonly<Array<string | null>> | null;
        evidenceFilenames?: Readonly<Array<string | null>> | null;
      }
    >,
    selectorFn: (s: RemoveEvidenceResult) => [...Sel]
  ): $Field<"removeEvidenceFromTestRun", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        id: "String!",
        evidenceIds: "[String]",
        evidenceFilenames: "[String]",
      },
      args,

      selection: selectorFn(new RemoveEvidenceResult()),
    };
    return this.$_select("removeEvidenceFromTestRun", options as any) as any;
  }

  /**
 * Mutation used to remove evidence from a Test Run Step.
===
The mutation below removes an evidence from the Test Run Step.
<pre>
mutation {
    <b>removeEvidenceFromTestRunStep</b>(
        testRunId: "5e8489c05f200f3cd45bbaf0",
        stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
        evidenceFilenames: ["evidence.txt"]
    ) {
        removedEvidence
        warnings
    }
}
</pre>
===
 */
  removeEvidenceFromTestRunStep<
    Args extends VariabledInput<{
      testRunId: string;
      stepId: string;
      iterationRank?: string | null;
      evidenceIds?: Readonly<Array<string | null>> | null;
      evidenceFilenames?: Readonly<Array<string | null>> | null;
    }>,
    Sel extends Selection<RemoveEvidenceResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        testRunId: string;
        stepId: string;
        iterationRank?: string | null;
        evidenceIds?: Readonly<Array<string | null>> | null;
        evidenceFilenames?: Readonly<Array<string | null>> | null;
      }
    >,
    selectorFn: (s: RemoveEvidenceResult) => [...Sel]
  ): $Field<"removeEvidenceFromTestRunStep", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        testRunId: "String!",
        stepId: "String!",
        iterationRank: "String",
        evidenceIds: "[String]",
        evidenceFilenames: "[String]",
      },
      args,

      selection: selectorFn(new RemoveEvidenceResult()),
    };
    return this.$_select("removeEvidenceFromTestRunStep", options as any) as any;
  }

  /**
 * Mutation used to remove issues from Folder.
===
The mutation below will remove issues from a Folder.
<pre>
mutation {
    <b>removeIssuesFromFolder</b>(
        projectId: "10000",
        issueIds: ["10002","12324","12345"]
    )
}
</pre>
===
 */
  removeIssuesFromFolder<
    Args extends VariabledInput<{
      projectId: string;
      issueIds: Readonly<Array<string | null>>;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        projectId: string;
        issueIds: Readonly<Array<string | null>>;
      }
    >
  ): $Field<"removeIssuesFromFolder", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        projectId: "String!",
        issueIds: "[String]!",
      },
      args,
    };
    return this.$_select("removeIssuesFromFolder", options as any) as any;
  }

  /**
 * Mutation used to remove Preconditions from the Test.
===
The mutation below will remove the preconditions with issue id "54321" and "67890" from the test "12345".
<pre>
mutation {
    <b>removePreconditionsFromTest</b>(issueId: "12345", preconditionIssueIds: ["54321", "67890"])
}
</pre>
===
===
The mutation below will remove the preconditions with issue id "54321" and "67890" from the version 3 of the Test "12345".
<pre>
mutation {
    <b>removePreconditionsFromTest</b>(issueId: "12345", versionId: 3, preconditionIssueIds: ["54321", "67890"])
}
</pre>
===
 */
  removePreconditionsFromTest<
    Args extends VariabledInput<{
      issueId: string;
      versionId?: number | null;
      preconditionIssueIds: Readonly<Array<string | null>>;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        versionId?: number | null;
        preconditionIssueIds: Readonly<Array<string | null>>;
      }
    >
  ): $Field<"removePreconditionsFromTest", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        versionId: "Int",
        preconditionIssueIds: "[String]!",
      },
      args,
    };
    return this.$_select("removePreconditionsFromTest", options as any) as any;
  }

  /**
 * Mutation used to remove Test Environments from the Test Execution.
===
The mutation below will remoive the Test Environments "android" and "ios" from the Test execution "12345".
<pre>
mutation {
    <b>removeTestEnvironmentsFromTestExecution</b>(
        issueId: "12345",
        testEnvironments: ["android", "ios"]
    )
}
</pre>
===
 */
  removeTestEnvironmentsFromTestExecution<
    Args extends VariabledInput<{
      issueId: string;
      testEnvironments: Readonly<Array<string | null>>;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testEnvironments: Readonly<Array<string | null>>;
      }
    >
  ): $Field<"removeTestEnvironmentsFromTestExecution", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testEnvironments: "[String]!",
      },
      args,
    };
    return this.$_select("removeTestEnvironmentsFromTestExecution", options as any) as any;
  }

  /**
 * Mutation used to remove Test Executions from the Test.
===
The mutation below will remove the Test Executions with issue id "54321" and "67890" from the Test "12345".
<pre>
mutation {
    <b>removeTestExecutionsFromTest</b>(issueId: "12345", testExecIssueIds: ["54321", "67890"])
}
</pre>
===
 */
  removeTestExecutionsFromTest<
    Args extends VariabledInput<{
      issueId: string;
      testExecIssueIds: Readonly<Array<string | null>>;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testExecIssueIds: Readonly<Array<string | null>>;
      }
    >
  ): $Field<"removeTestExecutionsFromTest", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testExecIssueIds: "[String]!",
      },
      args,
    };
    return this.$_select("removeTestExecutionsFromTest", options as any) as any;
  }

  /**
 * Mutation used to remove Test Executions from the Test Plan.
===
The mutation below will remove the Test executions with issue id "54321" and "67890" from the Test Plan "12345".
<pre>
mutation {
    <b>removeTestExecutionsFromTestPlan</b>(issueId: "12345", testExecIssueIds: ["54321", "67890"])
}
</pre>
===
 */
  removeTestExecutionsFromTestPlan<
    Args extends VariabledInput<{
      issueId: string;
      testExecIssueIds: Readonly<Array<string | null>>;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testExecIssueIds: Readonly<Array<string | null>>;
      }
    >
  ): $Field<"removeTestExecutionsFromTestPlan", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testExecIssueIds: "[String]!",
      },
      args,
    };
    return this.$_select("removeTestExecutionsFromTestPlan", options as any) as any;
  }

  /**
 * Mutation used to remove Test Plans from the Test.
===
The mutation below will remove the Test Plans with issue id "54321" and "67890" from the Test "12345".
<pre>
mutation {
    <b>removeTestPlansFromTest</b>(issueId: "12345", testPlanIssueIds: ["54321", "67890"])
}
</pre>
===
 */
  removeTestPlansFromTest<
    Args extends VariabledInput<{
      issueId: string;
      testPlanIssueIds: Readonly<Array<string | null>>;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testPlanIssueIds: Readonly<Array<string | null>>;
      }
    >
  ): $Field<"removeTestPlansFromTest", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testPlanIssueIds: "[String]!",
      },
      args,
    };
    return this.$_select("removeTestPlansFromTest", options as any) as any;
  }

  /**
 * Mutation used to remove Test Sets from the Test.
===
The mutation below will remove the Test Sets with issue id "54321" and "67890" from the test "12345".
<pre>
mutation {
    <b>removeTestSetsFromTest</b>(issueId: "12345", testSetIssueIds: ["54321", "67890"])
}
</pre>
===
 */
  removeTestSetsFromTest<
    Args extends VariabledInput<{
      issueId: string;
      testSetIssueIds: Readonly<Array<string | null>>;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testSetIssueIds: Readonly<Array<string | null>>;
      }
    >
  ): $Field<"removeTestSetsFromTest", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testSetIssueIds: "[String]!",
      },
      args,
    };
    return this.$_select("removeTestSetsFromTest", options as any) as any;
  }

  /**
 * Mutation used to remove a Step from a Test.
===
The mutation below removes the Step with id "836d30ec-f034-4a03-879e-9c44a1d6d1fe".
<pre>
mutation {
    <b>removeTestStep</b>(
        stepId: "836d30ec-f034-4a03-879e-9c44a1d6d1fe",
    )
}
</pre>
===
 */
  removeTestStep<
    Args extends VariabledInput<{
      stepId: string;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        stepId: string;
      }
    >
  ): $Field<"removeTestStep", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        stepId: "String!",
      },
      args,
    };
    return this.$_select("removeTestStep", options as any) as any;
  }

  /**
 * Mutation used to remove tests from Folder.
===
The mutation below will remove tests from a Folder.
<pre>
mutation {
    <b>removeTestsFromFolder</b>(
        projectId: "10000",
        testIssueIds: ["10002","12324","12345"]
    )
}
</pre>
===
 */
  removeTestsFromFolder<
    Args extends VariabledInput<{
      projectId?: string | null;
      testPlanId?: string | null;
      testIssueIds: Readonly<Array<string | null>>;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        projectId?: string | null;
        testPlanId?: string | null;
        testIssueIds: Readonly<Array<string | null>>;
      }
    >
  ): $Field<"removeTestsFromFolder", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        projectId: "String",
        testPlanId: "String",
        testIssueIds: "[String]!",
      },
      args,
    };
    return this.$_select("removeTestsFromFolder", options as any) as any;
  }

  /**
 * Mutation used to remove Tests from the Precondition. One of <b>testIssueIds</b> or <b>tests</b> is required.
===
The mutation below will remove the Tests with issue id "54321" and "67890" from the Precondition "12345".
<pre>
mutation {
    <b>removeTestsFromPrecondition</b>(issueId: "12345", testIssueIds: ["54321", "67890"])
}
</pre>
===
===
The mutation below will remove the version 2 of Test "54321" and the version 3 of Test "67890" from the Precondition "12345".
<pre>
mutation {
    <b>removeTestsFromPrecondition</b>(
        issueId: "12345",
        tests: [{ issueId: "54321", versionId: 2 }, { issueId: "67890", versionId: 3 }]
    )
}
</pre>
===
 */
  removeTestsFromPrecondition<
    Args extends VariabledInput<{
      issueId: string;
      testIssueIds?: Readonly<Array<string | null>> | null;
      tests?: Readonly<Array<TestWithVersionInput | null>> | null;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testIssueIds?: Readonly<Array<string | null>> | null;
        tests?: Readonly<Array<TestWithVersionInput | null>> | null;
      }
    >
  ): $Field<"removeTestsFromPrecondition", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testIssueIds: "[String]",
        tests: "[TestWithVersionInput]",
      },
      args,
    };
    return this.$_select("removeTestsFromPrecondition", options as any) as any;
  }

  /**
 * Mutation used to remove Tests from the Test Execution.
===
The mutation below will remove the Tests with issue id "54321" and "67890" from the Test Execution "12345".
<pre>
mutation {
    <b>removeTestsFromTestExecution</b>(issueId: "12345", testIssueIds: ["54321", "67890"])
}
</pre>
===
 */
  removeTestsFromTestExecution<
    Args extends VariabledInput<{
      issueId: string;
      testIssueIds: Readonly<Array<string | null>>;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testIssueIds: Readonly<Array<string | null>>;
      }
    >
  ): $Field<"removeTestsFromTestExecution", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testIssueIds: "[String]!",
      },
      args,
    };
    return this.$_select("removeTestsFromTestExecution", options as any) as any;
  }

  /**
 * Mutation used to remove Tests from the Test Plan.
===
The mutation below will remove the Tests with id "54321" and "67890" from the Test Plan "12345".
<pre>
mutation {
    <b>removeTestsFromTestPlan</b>(issueId: "12345", testIssueIds: ["54321", "67890"])
}
</pre>
===
 */
  removeTestsFromTestPlan<
    Args extends VariabledInput<{
      issueId: string;
      testIssueIds: Readonly<Array<string | null>>;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testIssueIds: Readonly<Array<string | null>>;
      }
    >
  ): $Field<"removeTestsFromTestPlan", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testIssueIds: "[String]!",
      },
      args,
    };
    return this.$_select("removeTestsFromTestPlan", options as any) as any;
  }

  /**
 * Mutation used to remove Tests from the Test Set.
===
The mutation below will remove the Tests with issue id "54321" and "67890" from the test set "12345".
<pre>
mutation {
    <b>removeTestsFromTestSet</b>(issueId: "12345", testIssueIds: ["54321", "67890"])
}
</pre>
===
 */
  removeTestsFromTestSet<
    Args extends VariabledInput<{
      issueId: string;
      testIssueIds: Readonly<Array<string | null>>;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        testIssueIds: Readonly<Array<string | null>>;
      }
    >
  ): $Field<"removeTestsFromTestSet", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        testIssueIds: "[String]!",
      },
      args,
    };
    return this.$_select("removeTestsFromTestSet", options as any) as any;
  }

  /**
 * Mutation used to rename a Folder.
===
The mutation below will rename a Folder.
<pre>
mutation {
    <b>renameFolder</b>(
        projectId: "10000",
        path: "/generic",
        newName: "Junit"
    ) {
        folder {
            name
            path
            testsCount
        }
        warnings
    }
}
</pre>
===
 */
  renameFolder<
    Args extends VariabledInput<{
      projectId?: string | null;
      testPlanId?: string | null;
      path: string;
      newName: string;
    }>,
    Sel extends Selection<ActionFolderResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        projectId?: string | null;
        testPlanId?: string | null;
        path: string;
        newName: string;
      }
    >,
    selectorFn: (s: ActionFolderResult) => [...Sel]
  ): $Field<"renameFolder", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        projectId: "String",
        testPlanId: "String",
        path: "String!",
        newName: "String!",
      },
      args,

      selection: selectorFn(new ActionFolderResult()),
    };
    return this.$_select("renameFolder", options as any) as any;
  }

  /**
 * Mutation used to reset the Test Run. This will load the new test definition and delete the current execution data.
===
The mutation below resets the Test Run.
<pre>
mutation {
    <b>resetTestRun</b>( id: "5acc7ab0a3fe1b6fcdc3c737")
}
</pre>
===
 */
  resetTestRun<
    Args extends VariabledInput<{
      id: string;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        id: string;
      }
    >
  ): $Field<"resetTestRun", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        id: "String!",
      },
      args,
    };
    return this.$_select("resetTestRun", options as any) as any;
  }

  /**
 * Mutation used to set the timer in Test Run. This will start, pause or stop the timer in Test Run.
===
The mutation below start the timer in Test Run.
<pre>
mutation {
    <b>setTestRunTimer</b>(
        testRunId: "5acc7ab0a3fe1b6fcdc3c737"
        running: true
    ) {
        warnings
    }
}
</pre>

The mutation below stop the timer in Test Run.
<pre>
mutation {
    <b>setTestRunTimer</b>(
        testRunId: "5acc7ab0a3fe1b6fcdc3c737"
        reset: true
    ) {
        warnings
    }
}
</pre>
===
 */
  setTestRunTimer<
    Args extends VariabledInput<{
      testRunId: string;
      running?: boolean | null;
      reset?: boolean | null;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        testRunId: string;
        running?: boolean | null;
        reset?: boolean | null;
      }
    >
  ): $Field<"setTestRunTimer", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        testRunId: "String!",
        running: "Boolean",
        reset: "Boolean",
      },
      args,
    };
    return this.$_select("setTestRunTimer", options as any) as any;
  }

  /**
 * Mutation used to update the Gherkin definition of a Test.
===
The mutation below will update the gherkin definition of the Test with id "12345".
<pre>
mutation {
    <b>updateGherkinTestDefinition</b>(issueId: "12345", gherkin: "Gherkin definition" ) {
        issueId
        gherkin
    }
}
</pre>
===
===
The mutation below will update the gherkin definition of the version 3 of the Test with id "12345".
<pre>
mutation {
    <b>updateGherkinTestDefinition</b>(issueId: "12345", versionId: 3, gherkin: "Gherkin definition" ) {
        issueId
        gherkin
    }
}
</pre>
===
 */
  updateGherkinTestDefinition<
    Args extends VariabledInput<{
      issueId: string;
      versionId?: number | null;
      gherkin: string;
    }>,
    Sel extends Selection<Test>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        versionId?: number | null;
        gherkin: string;
      }
    >,
    selectorFn: (s: Test) => [...Sel]
  ): $Field<"updateGherkinTestDefinition", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        versionId: "Int",
        gherkin: "String!",
      },
      args,

      selection: selectorFn(new Test()),
    };
    return this.$_select("updateGherkinTestDefinition", options as any) as any;
  }

  /**
 * Mutation used to update the status of a Test Run iteration.
===
The mutation below updates the status of a Test Run iteration.
<pre>
mutation {
    <b>updateIterationStatus</b>(
        testRunId: "5e8489c05f200f3cd45bbaf0",
        iterationRank: "0",
        status: "PASSED"
    ) {
        warnings
    }
}
</pre>
===
 */
  updateIterationStatus<
    Args extends VariabledInput<{
      testRunId: string;
      iterationRank: string;
      status: string;
    }>,
    Sel extends Selection<UpdateIterationStatusResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        testRunId: string;
        iterationRank: string;
        status: string;
      }
    >,
    selectorFn: (s: UpdateIterationStatusResult) => [...Sel]
  ): $Field<"updateIterationStatus", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        testRunId: "String!",
        iterationRank: "String!",
        status: "String!",
      },
      args,

      selection: selectorFn(new UpdateIterationStatusResult()),
    };
    return this.$_select("updateIterationStatus", options as any) as any;
  }

  /**
 * Mutation used to update a Precondition
===
The mutation below will update the Precondition with id "49137"
<pre>
mutation {
    <b>updatePrecondition</b>(
        issueId: "49137",
        data: { preconditionType: {name: "Manual" }, definition: "Turn on calculator" }
    ) {
        issueId
        preconditionType {
            kind
            name
        }
        definition
    }
}
</pre>
===
===
The mutation below will update the Precondition with id "12345" and move it to the specified folder
<pre>
mutation {
    <b>updatePrecondition</b>(
        issueId: "12345",
        data: { folderPath: "/generic" }
    ) {
        issueId
        preconditionType {
            kind
            name
        }
        definition
    }
}
</pre>
===
 */
  updatePrecondition<
    Args extends VariabledInput<{
      issueId: string;
      data?: UpdatePreconditionInput | null;
    }>,
    Sel extends Selection<Precondition>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        data?: UpdatePreconditionInput | null;
      }
    >,
    selectorFn: (s: Precondition) => [...Sel]
  ): $Field<"updatePrecondition", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        data: "UpdatePreconditionInput",
      },
      args,

      selection: selectorFn(new Precondition()),
    };
    return this.$_select("updatePrecondition", options as any) as any;
  }

  /**
 * Mutation used update the precondition folder on the Test Repository.
===
The mutation below will add the precondition to "Component/UI" folder.
<pre>
mutation {
    <b>updatePreconditionFolder</b>(
        issueId: "12345",
        folderPath: "/Component/UI"
    )
}
</pre>
The mutation below will move the Precondition to the root.
<pre>
mutation {
    <b>updatePreconditionFolder</b>(
        issueId: "12345",
        folderPath: "/"
    )
}
</pre>
===
 */
  updatePreconditionFolder<
    Args extends VariabledInput<{
      issueId: string;
      folderPath: string;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        folderPath: string;
      }
    >
  ): $Field<"updatePreconditionFolder", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        folderPath: "String!",
      },
      args,
    };
    return this.$_select("updatePreconditionFolder", options as any) as any;
  }

  /**
 * Mutation used update the Test folder on the Test Repository.
===
The mutation below will add the test to "Component/UI" folder.
<pre>
mutation {
    <b>updateTestFolder</b>(
        issueId: "12345",
        folderPath: "/Component/UI"
    )
}
</pre>
The mutation below will move the Test to the root.
<pre>
mutation {
    <b>updateTestFolder</b>(
        issueId: "12345",
        folderPath: "/"
    )
}
</pre>
===
 */
  updateTestFolder<
    Args extends VariabledInput<{
      issueId: string;
      folderPath: string;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        folderPath: string;
      }
    >
  ): $Field<"updateTestFolder", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        folderPath: "String!",
      },
      args,
    };
    return this.$_select("updateTestFolder", options as any) as any;
  }

  /**
 * Mutation used to update a Test Run.
===
The mutation below updates a Test Run.
<pre>
mutation {
    <b>updateTestRun</b>( id: "5acc7ab0a3fe1b6fcdc3c737", comment: "Everything is OK.", startedOn: "2020-03-09T10:35:09Z", finishedOn: "2020-04-09T10:35:09Z", assigneeId: "e5983db2-90f7-4135-a96f-46907e72290e", executedById: "e5983db2-90f7-4135-a96f-46907e72290e") {
        warnings
    }
}
</pre>
===
 */
  updateTestRun<
    Args extends VariabledInput<{
      id: string;
      comment?: string | null;
      startedOn?: string | null;
      finishedOn?: string | null;
      assigneeId?: string | null;
      executedById?: string | null;
      customFields?: Readonly<Array<CustomFieldInput | null>> | null;
    }>,
    Sel extends Selection<UpdateTestRunResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        id: string;
        comment?: string | null;
        startedOn?: string | null;
        finishedOn?: string | null;
        assigneeId?: string | null;
        executedById?: string | null;
        customFields?: Readonly<Array<CustomFieldInput | null>> | null;
      }
    >,
    selectorFn: (s: UpdateTestRunResult) => [...Sel]
  ): $Field<"updateTestRun", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        id: "String!",
        comment: "String",
        startedOn: "String",
        finishedOn: "String",
        assigneeId: "String",
        executedById: "String",
        customFields: "[CustomFieldInput]",
      },
      args,

      selection: selectorFn(new UpdateTestRunResult()),
    };
    return this.$_select("updateTestRun", options as any) as any;
  }

  /**
 * Mutation used to update the comment of a Test Run.
===
The mutation below updates the comment of a Test Run.
<pre>
mutation {
    <b>updateTestRunComment</b>( id: "5acc7ab0a3fe1b6fcdc3c737", comment: "Everything is OK.")
}
</pre>
===
 */
  updateTestRunComment<
    Args extends VariabledInput<{
      id: string;
      comment: string;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        id: string;
        comment: string;
      }
    >
  ): $Field<"updateTestRunComment", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        id: "String!",
        comment: "String!",
      },
      args,
    };
    return this.$_select("updateTestRunComment", options as any) as any;
  }

  /**
 * Mutation used to update the status of a Test Run Example.
===
The mutation below updates the status of a Test Run example.
<pre>
mutation {
    <b>updateTestRunExampleStatus</b>(
        exampleId: "5bbd8ab0a3fe1b6fcdc3c737",
        status: "PASSED"
    ) {
        warnings
    }
}
</pre>
===
 */
  updateTestRunExampleStatus<
    Args extends VariabledInput<{
      exampleId: string;
      status: string;
    }>,
    Sel extends Selection<UpdateTestRunExampleStatusResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        exampleId: string;
        status: string;
      }
    >,
    selectorFn: (s: UpdateTestRunExampleStatusResult) => [...Sel]
  ): $Field<"updateTestRunExampleStatus", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        exampleId: "String!",
        status: "String!",
      },
      args,

      selection: selectorFn(new UpdateTestRunExampleStatusResult()),
    };
    return this.$_select("updateTestRunExampleStatus", options as any) as any;
  }

  /**
 * Mutation used to update the status of a Test Run.
===
The mutation below updates the status of a Test Run.
<pre>
mutation {
    <b>updateTestRunStatus</b>( id: "5acc7ab0a3fe1b6fcdc3c737", status: "PASSED")
}
</pre>
===
 */
  updateTestRunStatus<
    Args extends VariabledInput<{
      id: string;
      status: string;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        id: string;
        status: string;
      }
    >
  ): $Field<"updateTestRunStatus", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        id: "String!",
        status: "String!",
      },
      args,
    };
    return this.$_select("updateTestRunStatus", options as any) as any;
  }

  /**
 * Mutation used to update the Test Run Step.
===
The mutation below will change the status, update the comment and add a defect to the Test Run Step.
<pre>
mutation {
    <b>updateTestRunStep</b>(
        testRunId: "5e8489c05f200f3cd45bbaf0",
        stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
        updateData: {
            comment: "Step failed"
            status: "FAILED"
            defects: {
                add: ["12345"]
            }
        }
    ) {
        addedDefects
        warnings
    }
}
</pre>
===
 */
  updateTestRunStep<
    Args extends VariabledInput<{
      testRunId: string;
      stepId: string;
      updateData: UpdateTestRunStepInput;
      iterationRank?: string | null;
    }>,
    Sel extends Selection<UpdateTestRunStepResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        testRunId: string;
        stepId: string;
        updateData: UpdateTestRunStepInput;
        iterationRank?: string | null;
      }
    >,
    selectorFn: (s: UpdateTestRunStepResult) => [...Sel]
  ): $Field<"updateTestRunStep", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        testRunId: "String!",
        stepId: "String!",
        updateData: "UpdateTestRunStepInput!",
        iterationRank: "String",
      },
      args,

      selection: selectorFn(new UpdateTestRunStepResult()),
    };
    return this.$_select("updateTestRunStep", options as any) as any;
  }

  /**
 * Mutation used to update the comment of a Test Run Step.
===
The mutation below updates the comment of a Test Run Step.
<pre>
mutation {
    <b>updateTestRunStepComment</b>(
        testRunId: "5e8489c05f200f3cd45bbaf0",
        stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
        comment: "This step is OK."
    )
}
</pre>
===
 */
  updateTestRunStepComment<
    Args extends VariabledInput<{
      testRunId: string;
      stepId: string;
      comment: string;
      iterationRank?: string | null;
    }>,
  >(
    args: ExactArgNames<
      Args,
      {
        testRunId: string;
        stepId: string;
        comment: string;
        iterationRank?: string | null;
      }
    >
  ): $Field<"updateTestRunStepComment", string | null, GetVariables<[], Args>> {
    const options = {
      argTypes: {
        testRunId: "String!",
        stepId: "String!",
        comment: "String!",
        iterationRank: "String",
      },
      args,
    };
    return this.$_select("updateTestRunStepComment", options as any) as any;
  }

  /**
 * Mutation used to update the status of a Test Run Step.
===
The mutation below updates the status of a Test Run Step.
<pre>
mutation {
    <b>updateTestRunStepStatus</b>(
        testRunId: "5e8489c05f200f3cd45bbaf0",
        stepId: "316eb258-10bb-40c0-ae40-ab76004cc505",
        status: "PASSED"
    ) {
        warnings
    }
}
</pre>
===
 */
  updateTestRunStepStatus<
    Args extends VariabledInput<{
      testRunId: string;
      stepId: string;
      status: string;
      iterationRank?: string | null;
    }>,
    Sel extends Selection<UpdateTestRunStepStatusResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        testRunId: string;
        stepId: string;
        status: string;
        iterationRank?: string | null;
      }
    >,
    selectorFn: (s: UpdateTestRunStepStatusResult) => [...Sel]
  ): $Field<"updateTestRunStepStatus", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        testRunId: "String!",
        stepId: "String!",
        status: "String!",
        iterationRank: "String",
      },
      args,

      selection: selectorFn(new UpdateTestRunStepStatusResult()),
    };
    return this.$_select("updateTestRunStepStatus", options as any) as any;
  }

  /**
 * Mutation used to update a Step of a Test.
===
The mutation below will update the Step with id "836d30ec-f034-4a03-879e-9c44a1d6d1fe".
<pre>
mutation {
    <b>updateTestStep</b>(
        stepId: "836d30ec-f034-4a03-879e-9c44a1d6d1fe",
        step: {
            result: "Xray Cloud Rest Api works as expected",
            customFields: [{id:"5ddc0e585da9670010e608dc", value:"Lisbon"}]
        }
    ) {
        warnings
    }
}
</pre>
===
 */
  updateTestStep<
    Args extends VariabledInput<{
      stepId: string;
      step: UpdateStepInput;
    }>,
    Sel extends Selection<UpdateTestStepResult>,
  >(
    args: ExactArgNames<
      Args,
      {
        stepId: string;
        step: UpdateStepInput;
      }
    >,
    selectorFn: (s: UpdateTestStepResult) => [...Sel]
  ): $Field<"updateTestStep", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        stepId: "String!",
        step: "UpdateStepInput!",
      },
      args,

      selection: selectorFn(new UpdateTestStepResult()),
    };
    return this.$_select("updateTestStep", options as any) as any;
  }

  /**
 * Mutation used to update the Test Type of a Test.
===
The mutation below will update the Test Type of the Test with id "12345".
<pre>
mutation {
    <b>updateTestType</b>(issueId: "12345", testType: {name: "Manual"} ) {
        issueId
        testType {
            name
            kind
        }
    }
}
</pre>
===
===
The mutation below will update the Test Type of the version 3 of the Test with id "12345".
<pre>
mutation {
    <b>updateTestType</b>(issueId: "12345", versionId: 3, testType: {name: "Manual"} ) {
        issueId
        testType {
            name
            kind
        }
    }
}
</pre>
===
 */
  updateTestType<
    Args extends VariabledInput<{
      issueId: string;
      versionId?: number | null;
      testType: UpdateTestTypeInput;
    }>,
    Sel extends Selection<Test>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        versionId?: number | null;
        testType: UpdateTestTypeInput;
      }
    >,
    selectorFn: (s: Test) => [...Sel]
  ): $Field<"updateTestType", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        versionId: "Int",
        testType: "UpdateTestTypeInput!",
      },
      args,

      selection: selectorFn(new Test()),
    };
    return this.$_select("updateTestType", options as any) as any;
  }

  /**
 * Mutation used to update the Unstructured definition of a Test.
===
The mutation below will update the unstructured definition of the Test with id "12345".
<pre>
mutation {
    <b>updateUnstructuredTestDefinition</b>(issueId: "12345", unstructured: "Generic definition" ) {
        issueId
        unstructured
    }
}
</pre>
===
===
The mutation below will update the unstructured definition of the version 3 of the Test with id "12345".
<pre>
mutation {
    <b>updateUnstructuredTestDefinition</b>(issueId: "12345", versionId: 3, unstructured: "Generic definition" ) {
        issueId
        unstructured
    }
}
</pre>
===
 */
  updateUnstructuredTestDefinition<
    Args extends VariabledInput<{
      issueId: string;
      versionId?: number | null;
      unstructured: string;
    }>,
    Sel extends Selection<Test>,
  >(
    args: ExactArgNames<
      Args,
      {
        issueId: string;
        versionId?: number | null;
        unstructured: string;
      }
    >,
    selectorFn: (s: Test) => [...Sel]
  ): $Field<"updateUnstructuredTestDefinition", GetOutput<Sel> | null, GetVariables<Sel, Args>> {
    const options = {
      argTypes: {
        issueId: "String!",
        versionId: "Int",
        unstructured: "String!",
      },
      args,

      selection: selectorFn(new Test()),
    };
    return this.$_select("updateUnstructuredTestDefinition", options as any) as any;
  }
}

export class ActionFolderResult extends $Base<"ActionFolderResult"> {
  constructor() {
    super("ActionFolderResult");
  }

  /**
   * Folder updated during the operation.
   */
  folder<Sel extends Selection<SimpleFolderResults>>(
    selectorFn: (s: SimpleFolderResults) => [...Sel]
  ): $Field<"folder", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new SimpleFolderResults()),
    };
    return this.$_select("folder", options as any) as any;
  }

  /**
   * Warning generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

export class SimpleFolderResults extends $Base<"SimpleFolderResults"> {
  constructor() {
    super("SimpleFolderResults");
  }

  /**
   * Folder issues count
   */
  get issuesCount(): $Field<"issuesCount", number | null> {
    return this.$_select("issuesCount") as any;
  }

  /**
   * Folder name
   */
  get name(): $Field<"name", string | null> {
    return this.$_select("name") as any;
  }

  /**
   * Folder path
   */
  get path(): $Field<"path", string | null> {
    return this.$_select("path") as any;
  }

  /**
   * Folder preconditions count
   */
  get preconditionsCount(): $Field<"preconditionsCount", number | null> {
    return this.$_select("preconditionsCount") as any;
  }

  /**
   * Folder tests count
   */
  get testsCount(): $Field<"testsCount", number | null> {
    return this.$_select("testsCount") as any;
  }
}

/**
 * Test Type input
 */
export type UpdateTestTypeInput = {
  id?: string | null;
  name?: string | null;
};

/**
 * Create Step input
 */
export type CreateStepInput = {
  action?: string | null;
  attachments?: Readonly<Array<AttachmentInput | null>> | null;
  callTestIssueId?: string | null;
  customFields?: Readonly<Array<CustomStepFieldInput | null>> | null;
  data?: string | null;
  result?: string | null;
};

/**
 * Attachment input
 */
export type AttachmentInput = {
  data?: string | null;
  filename?: string | null;
  mimeType?: string | null;
};

/**
 * Step Custom Field input
 */
export type CustomStepFieldInput = {
  id?: string | null;
  value?: JSON | null;
};

/**
 * Create Test Result type
 */
export class CreateTestResult extends $Base<"CreateTestResult"> {
  constructor() {
    super("CreateTestResult");
  }

  /**
   * Test that was created.
   */
  test<Sel extends Selection<Test>>(
    selectorFn: (s: Test) => [...Sel]
  ): $Field<"test", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Test()),
    };
    return this.$_select("test", options as any) as any;
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Update Step input
 */
export type UpdateStepInput = {
  action?: string | null;
  attachments?: AttachmentOperationsInput | null;
  customFields?: Readonly<Array<CustomStepFieldInput | null>> | null;
  data?: string | null;
  result?: string | null;
};

/**
 * Attachment Operations Input
 */
export type AttachmentOperationsInput = {
  add?: Readonly<Array<AttachmentInput | null>> | null;
  removeFilenames?: Readonly<Array<string | null>> | null;
  removeIds?: Readonly<Array<string | null>> | null;
};

/**
 * Update Test Step Results type
 */
export class UpdateTestStepResult extends $Base<"UpdateTestStepResult"> {
  constructor() {
    super("UpdateTestStepResult");
  }

  /**
   * List of added attachments.
   */
  get addedAttachments(): $Field<"addedAttachments", Readonly<Array<string | null>> | null> {
    return this.$_select("addedAttachments") as any;
  }

  /**
   * List of removed attachments.
   */
  get removedAttachments(): $Field<"removedAttachments", Readonly<Array<string | null>> | null> {
    return this.$_select("removedAttachments") as any;
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Add Preconditions Result type
 */
export class AddPreconditionsResult extends $Base<"AddPreconditionsResult"> {
  constructor() {
    super("AddPreconditionsResult");
  }

  /**
   * Issue ids of the added Preconditions.
   */
  get addedPreconditions(): $Field<"addedPreconditions", Readonly<Array<string | null>> | null> {
    return this.$_select("addedPreconditions") as any;
  }

  /**
   * Warning generated during the operation.
   */
  get warning(): $Field<"warning", string | null> {
    return this.$_select("warning") as any;
  }
}

/**
 * Add Test Sets Result type
 */
export class AddTestSetsResult extends $Base<"AddTestSetsResult"> {
  constructor() {
    super("AddTestSetsResult");
  }

  /**
   * Issue ids of the added Test Set.
   */
  get addedTestSets(): $Field<"addedTestSets", Readonly<Array<string | null>> | null> {
    return this.$_select("addedTestSets") as any;
  }

  /**
   * Warning generated during the operation.
   */
  get warning(): $Field<"warning", string | null> {
    return this.$_select("warning") as any;
  }
}

/**
 * Add Test Plans Result type
 */
export class AddTestPlansResult extends $Base<"AddTestPlansResult"> {
  constructor() {
    super("AddTestPlansResult");
  }

  /**
   * Issue ids of the added Test Plans.
   */
  get addedTestPlans(): $Field<"addedTestPlans", Readonly<Array<string | null>> | null> {
    return this.$_select("addedTestPlans") as any;
  }

  /**
   * Warning generated during the operation.
   */
  get warning(): $Field<"warning", string | null> {
    return this.$_select("warning") as any;
  }
}

/**
 * Add Test Executions Result type
 */
export class AddTestExecutionsResult extends $Base<"AddTestExecutionsResult"> {
  constructor() {
    super("AddTestExecutionsResult");
  }

  /**
   * Issue ids of the added Test Executions.
   */
  get addedTestExecutions(): $Field<"addedTestExecutions", Readonly<Array<string | null>> | null> {
    return this.$_select("addedTestExecutions") as any;
  }

  /**
   * Warning generated during the operation.
   */
  get warning(): $Field<"warning", string | null> {
    return this.$_select("warning") as any;
  }
}

/**
 * Precondition Type input
 */
export type UpdatePreconditionTypeInput = {
  id?: string | null;
  name?: string | null;
};

/**
 * Create Precondition Response type
 */
export class CreatePreconditionResult extends $Base<"CreatePreconditionResult"> {
  constructor() {
    super("CreatePreconditionResult");
  }

  /**
   * Precondition that was created.
   */
  precondition<Sel extends Selection<Precondition>>(
    selectorFn: (s: Precondition) => [...Sel]
  ): $Field<"precondition", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new Precondition()),
    };
    return this.$_select("precondition", options as any) as any;
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Update Precondition input
 */
export type UpdatePreconditionInput = {
  definition?: string | null;
  folderPath?: string | null;
  preconditionType?: UpdatePreconditionTypeInput | null;
};

/**
 * Add Tests Result type
 */
export class AddTestsResult extends $Base<"AddTestsResult"> {
  constructor() {
    super("AddTestsResult");
  }

  /**
   * Issue Ids of the added Tests.
   */
  get addedTests(): $Field<"addedTests", Readonly<Array<string | null>> | null> {
    return this.$_select("addedTests") as any;
  }

  /**
   * Warning generated during the operation.
   */
  get warning(): $Field<"warning", string | null> {
    return this.$_select("warning") as any;
  }
}

/**
 * Create Test Set Result type
 */
export class CreateTestSetResult extends $Base<"CreateTestSetResult"> {
  constructor() {
    super("CreateTestSetResult");
  }

  /**
   * Test Set that was created.
   */
  testSet<Sel extends Selection<TestSet>>(
    selectorFn: (s: TestSet) => [...Sel]
  ): $Field<"testSet", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestSet()),
    };
    return this.$_select("testSet", options as any) as any;
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Create Test Plan Result type
 */
export class CreateTestPlanResult extends $Base<"CreateTestPlanResult"> {
  constructor() {
    super("CreateTestPlanResult");
  }

  /**
   * Test Plan that was created.
   */
  testPlan<Sel extends Selection<TestPlan>>(
    selectorFn: (s: TestPlan) => [...Sel]
  ): $Field<"testPlan", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestPlan()),
    };
    return this.$_select("testPlan", options as any) as any;
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Create Test Execution Result type
 */
export class CreateTestExecutionResult extends $Base<"CreateTestExecutionResult"> {
  constructor() {
    super("CreateTestExecutionResult");
  }

  /**
   * Test Environments that were created.
   */
  get createdTestEnvironments(): $Field<
    "createdTestEnvironments",
    Readonly<Array<string | null>> | null
  > {
    return this.$_select("createdTestEnvironments") as any;
  }

  /**
   * Test Execution that was created.
   */
  testExecution<Sel extends Selection<TestExecution>>(
    selectorFn: (s: TestExecution) => [...Sel]
  ): $Field<"testExecution", GetOutput<Sel> | null, GetVariables<Sel>> {
    const options = {
      selection: selectorFn(new TestExecution()),
    };
    return this.$_select("testExecution", options as any) as any;
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Add Test Environments Result type
 */
export class AddTestEnvironmentsResult extends $Base<"AddTestEnvironmentsResult"> {
  constructor() {
    super("AddTestEnvironmentsResult");
  }

  /**
   * Test Environments that were associated.
   */
  get associatedTestEnvironments(): $Field<
    "associatedTestEnvironments",
    Readonly<Array<string | null>> | null
  > {
    return this.$_select("associatedTestEnvironments") as any;
  }

  /**
   * Test Environments that were created.
   */
  get createdTestEnvironments(): $Field<
    "createdTestEnvironments",
    Readonly<Array<string | null>> | null
  > {
    return this.$_select("createdTestEnvironments") as any;
  }

  /**
   * Warning generated during the operation.
   */
  get warning(): $Field<"warning", string | null> {
    return this.$_select("warning") as any;
  }
}

/**
 * Custom Field Input
 */
export type CustomFieldInput = {
  id?: string | null;
  value?: JSON | null;
};

/**
 * Update Test Run Result Type
 */
export class UpdateTestRunResult extends $Base<"UpdateTestRunResult"> {
  constructor() {
    super("UpdateTestRunResult");
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Added Defects Result Type
 */
export class AddDefectsResult extends $Base<"AddDefectsResult"> {
  constructor() {
    super("AddDefectsResult");
  }

  /**
   * Ids of the added Defects.
   */
  get addedDefects(): $Field<"addedDefects", Readonly<Array<string | null>> | null> {
    return this.$_select("addedDefects") as any;
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Attachment Data Input
 */
export type AttachmentDataInput = {
  attachmentId?: string | null;
  data?: string | null;
  filename?: string | null;
  mimeType?: string | null;
};

/**
 * Add Evidence Result Type
 */
export class AddEvidenceResult extends $Base<"AddEvidenceResult"> {
  constructor() {
    super("AddEvidenceResult");
  }

  /**
   * Ids of the added Evidence.
   */
  get addedEvidence(): $Field<"addedEvidence", Readonly<Array<string | null>> | null> {
    return this.$_select("addedEvidence") as any;
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Remove Evidence Result Type
 */
export class RemoveEvidenceResult extends $Base<"RemoveEvidenceResult"> {
  constructor() {
    super("RemoveEvidenceResult");
  }

  /**
   * Ids of the removed Evidence.
   */
  get removedEvidence(): $Field<"removedEvidence", Readonly<Array<string | null>> | null> {
    return this.$_select("removedEvidence") as any;
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Update Test Run Step Input
 */
export type UpdateTestRunStepInput = {
  actualResult?: string | null;
  comment?: string | null;
  defects?: TestRunDefectOperationsInput | null;
  evidence?: TestRunEvidenceOperationsInput | null;
  status?: string | null;
};

/**
 * Test Run Evidence Operations Input
 */
export type TestRunEvidenceOperationsInput = {
  add?: Readonly<Array<AttachmentDataInput | null>> | null;
  removeFilenames?: Readonly<Array<string | null>> | null;
  removeIds?: Readonly<Array<string | null>> | null;
};

/**
 * Test Run Defect Operations Input
 */
export type TestRunDefectOperationsInput = {
  add?: Readonly<Array<string | null>> | null;
  remove?: Readonly<Array<string | null>> | null;
};

/**
 * Update Test Run Step Result Type
 */
export class UpdateTestRunStepResult extends $Base<"UpdateTestRunStepResult"> {
  constructor() {
    super("UpdateTestRunStepResult");
  }

  /**
   * Ids of the added Defects.
   */
  get addedDefects(): $Field<"addedDefects", Readonly<Array<string | null>> | null> {
    return this.$_select("addedDefects") as any;
  }

  /**
   * Ids of the added Evidence.
   */
  get addedEvidence(): $Field<"addedEvidence", Readonly<Array<string | null>> | null> {
    return this.$_select("addedEvidence") as any;
  }

  /**
   * Ids of the removed Defects.
   */
  get removedDefects(): $Field<"removedDefects", Readonly<Array<string | null>> | null> {
    return this.$_select("removedDefects") as any;
  }

  /**
   * Ids of the removed Evidence.
   */
  get removedEvidence(): $Field<"removedEvidence", Readonly<Array<string | null>> | null> {
    return this.$_select("removedEvidence") as any;
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Remove defects Result Type
 */
export class RemoveDefectsResult extends $Base<"RemoveDefectsResult"> {
  constructor() {
    super("RemoveDefectsResult");
  }

  /**
   * Ids of the removed Defects.
   */
  get removedDefects(): $Field<"removedDefects", Readonly<Array<string | null>> | null> {
    return this.$_select("removedDefects") as any;
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Update Test Run Step Status Result Type
 */
export class UpdateTestRunStepStatusResult extends $Base<"UpdateTestRunStepStatusResult"> {
  constructor() {
    super("UpdateTestRunStepStatusResult");
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Update Test Run Example Status Result Type
 */
export class UpdateTestRunExampleStatusResult extends $Base<"UpdateTestRunExampleStatusResult"> {
  constructor() {
    super("UpdateTestRunExampleStatusResult");
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

/**
 * Update Test Run iteration status result type
 */
export class UpdateIterationStatusResult extends $Base<"UpdateIterationStatusResult"> {
  constructor() {
    super("UpdateIterationStatusResult");
  }

  /**
   * Warnings generated during the operation.
   */
  get warnings(): $Field<"warnings", Readonly<Array<string | null>> | null> {
    return this.$_select("warnings") as any;
  }
}

const $Root = {
  query: Query,
  mutation: Mutation,
};

namespace $RootTypes {
  export type query = Query;
  export type mutation = Mutation;
}

export function query<Sel extends Selection<$RootTypes.query>>(
  name: string,
  selectFn: (q: $RootTypes.query) => [...Sel]
): TypedDocumentNode<GetOutput<Sel>, GetVariables<Sel>>;
export function query<Sel extends Selection<$RootTypes.query>>(
  selectFn: (q: $RootTypes.query) => [...Sel]
): TypedDocumentNode<GetOutput<Sel>, Simplify<GetVariables<Sel>>>;
export function query<Sel extends Selection<$RootTypes.query>>(name: any, selectFn?: any) {
  if (!selectFn) {
    selectFn = name;
    name = "";
  }
  let field = new $Field<"query", GetOutput<Sel>, GetVariables<Sel>>("query", {
    selection: selectFn(new $Root.query()),
  });
  const str = fieldToQuery(`query ${name}`, field);

  return gql(str) as any;
}

export function mutation<Sel extends Selection<$RootTypes.mutation>>(
  name: string,
  selectFn: (q: $RootTypes.mutation) => [...Sel]
): TypedDocumentNode<GetOutput<Sel>, GetVariables<Sel>>;
export function mutation<Sel extends Selection<$RootTypes.mutation>>(
  selectFn: (q: $RootTypes.mutation) => [...Sel]
): TypedDocumentNode<GetOutput<Sel>, Simplify<GetVariables<Sel>>>;
export function mutation<Sel extends Selection<$RootTypes.query>>(name: any, selectFn?: any) {
  if (!selectFn) {
    selectFn = name;
    name = "";
  }
  let field = new $Field<"mutation", GetOutput<Sel>, GetVariables<Sel>>("mutation", {
    selection: selectFn(new $Root.mutation()),
  });
  const str = fieldToQuery(`mutation ${name}`, field);

  return gql(str) as any;
}

const $InputTypes: { [key: string]: { [key: string]: string } } = {
  TestTypeInput: {
    id: "String",
    kind: "String",
    name: "String",
  },
  FolderSearchInput: {
    includeDescendants: "Boolean",
    path: "String!",
    testPlanId: "String",
  },
  TestWithVersionInput: {
    issueId: "String",
    versionId: "Int",
  },
  PreconditionFolderSearchInput: {
    includeDescendants: "Boolean",
    path: "String!",
  },
  UpdateTestTypeInput: {
    id: "String",
    name: "String",
  },
  CreateStepInput: {
    action: "String",
    attachments: "[AttachmentInput]",
    callTestIssueId: "String",
    customFields: "[CustomStepFieldInput]",
    data: "String",
    result: "String",
  },
  AttachmentInput: {
    data: "String",
    filename: "String",
    mimeType: "String",
  },
  CustomStepFieldInput: {
    id: "String",
    value: "JSON",
  },
  UpdateStepInput: {
    action: "String",
    attachments: "AttachmentOperationsInput",
    customFields: "[CustomStepFieldInput]",
    data: "String",
    result: "String",
  },
  AttachmentOperationsInput: {
    add: "[AttachmentInput]",
    removeFilenames: "[String]",
    removeIds: "[String]",
  },
  UpdatePreconditionTypeInput: {
    id: "String",
    name: "String",
  },
  UpdatePreconditionInput: {
    definition: "String",
    folderPath: "String",
    preconditionType: "UpdatePreconditionTypeInput",
  },
  CustomFieldInput: {
    id: "String",
    value: "JSON",
  },
  AttachmentDataInput: {
    attachmentId: "String",
    data: "String",
    filename: "String",
    mimeType: "String",
  },
  UpdateTestRunStepInput: {
    actualResult: "String",
    comment: "String",
    defects: "TestRunDefectOperationsInput",
    evidence: "TestRunEvidenceOperationsInput",
    status: "String",
  },
  TestRunEvidenceOperationsInput: {
    add: "[AttachmentDataInput]",
    removeFilenames: "[String]",
    removeIds: "[String]",
  },
  TestRunDefectOperationsInput: {
    add: "[String]",
    remove: "[String]",
  },
};
