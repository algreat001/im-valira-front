import React, { ReactElement, ReactNode } from "react";
import cookie from "cookie";
import nl2br from "react-nl2br";
import { format } from "util";

import en from "./en.json";
import de from "./de.json";
import fr from "./fr.json";
import ru from "./ru.json";

export type Ii18nSimple = (name: string, ...args: (number | string | boolean)[]) => string;

export type Local = "en" | "ru" | "fr" | "de";
export type ITnArgs = (number | string | boolean | ReactNode)[];
export type INL2BR = (string | ReactElement)[];

const dict = { en, de, fr, ru };

const defaultLocaleCode = "en";

let cookies;

try {
  cookies = cookie.parse(document.cookie);
} catch (e) {
  cookies = {};
}

function extractLocale(): string {
  const { language } = navigator;

  for (const locale in dict) {
    const code = locale as string;
    const re = new RegExp("^" + code, "i");

    if (re.test(language)) {
      return locale;
    }
  }

  return defaultLocaleCode;
}

let locale: Local = (cookies.lang || extractLocale()) as Local;

const notFound = new Set<string>();

// cache need for prevent parsing and for correct use tn(...) === tn(...)
const cache = {
  t: new Map<string, string>(),
  tn: new Map<string, string | string[] | ReactNode[]>()
};

/**
 * Extract value by name from dict
 * @param name
 */
const nameToValue = (name: string): string => {
  const path = name.split(".");
  let curr: any = dict[locale];
  try {
    path.forEach((name) => {
      curr = curr[name];
    });
  } catch (err) {
    console.log("i18 - error parse name", name);
    return "";
  }
  if (!curr) {
    console.log("i18 - not found name", name);
  }
  return curr as string ?? "";
};

/**
 * internal helper for format lines after nl2br and replace %n for ReactNode's
 * @param lines export from nl2br
 * @param nodeArgs preselected ReactNode args
 */
const linesToBody = (lines: INL2BR, nodeArgs: ReactNode[]): (string | ReactNode)[] => {
  const body = [];
  let k = 0;
  for (const line of lines) {
    if (typeof line !== "string") {
      body.push(line);
      continue;
    }
    if (!line.replace(/%%/g, "").includes("%n")) {
      body.push(line);
      continue;
    }
    let m: "%" | "" = ""; // marker and memory
    let buffer = "";
    // small hack: all % should not transform IF not a /%+n/ variant
    // because it variant translate without changes after `format`
    const chars = line.replace(/%+(?![n%])/g, (pattern) => pattern.replace(/%/g, "%%")).split("");
    for (const c of chars) {
      if (c === "%") {
        if (m === "%") {
          m = "";
          buffer += "%"; // m + c
        } else {
          m = "%";
        }
      } else {
        if (m === "") {
          buffer += c;
        } else {
          // if m === '%'
          m = "";
          if (c !== "n") {
            buffer += m + c;
          } else {
            body.push(buffer);
            if (nodeArgs.length) {
              // maybe that should write warning
              let node = nodeArgs.shift() as ReactElement;
              // if no key set key for wrapper for prevent react warnings
              if (!node.key) {
                node = React.createElement(React.Fragment, { key: `node${k++}` }, node);
              }
              body.push(node);
            }
            buffer = "";
          }
        }
      }
    }
    body.push(buffer);
  }
  return body;
};

/**
 * return string localisation by key otherwise null
 * if string have printf-like placements (%s, %d, %i, etc) it will replaced by util.format from args
 *
 * @param name path for key like 'module.submodule.name'
 * @param args replace %s %d for string and decimal,
 *   more info at https://nodejs.org/docs/latest-v10.x/api/util.html#util_util_format_format_args
 * @return string|null
 */
export const t: Ii18nSimple = (name: string, ...args: (number | string | boolean)[]): string => {
  const key = name + (args.length ? `:${args.join(":")}` : "");
  if (cache.t.has(key)) {
    return cache.t.get(key) ?? "";
  }
  const value = nameToValue(name);
  if (value == null) {
    notFound.add(name);
    console.log("i18 - not found name", name);
    return "";
  }
  const text = format(value.toString(), ...args);
  cache.t.set(key, text);
  return text;
};

/**
 * work at `t` but return Node localisation by key and replace `\n` to `<br />` otherwise null
 * if string have printf-like placements (%s, %d, %i, etc) it will replaced by util.format from args
 *
 * @param name path for key like 'module.submodule.name'
 * @param args replace %s %d for string and decimal, %n replaced by ReactNode object
 * @return ReactNode[]|null
 */
export const tn = (name: string, ...args: ITnArgs): string | string[] | ReactNode[] => {
  let useCache = true;
  // step 1: separate arguments for ReactNode and other
  // (now we have suppose only ReactNode have type is `object`)
  const baseArgs: (number | string | boolean)[] = [];
  const nodeArgs: ReactNode[] = [];
  for (const arg of args) {
    if (typeof arg === "object") {
      useCache = false;
      nodeArgs.push(arg);
    } else {
      baseArgs.push(arg as number | string | boolean);
    }
  }
  // step 2: if we can use cache try to use it
  let key;
  if (useCache) {
    key = name + (args.length ? `:${args.join(":")}` : "") ?? "";
    if (cache.tn.has(key)) {
      return cache.tn.get(key) ?? "";
    }
  }
  // step 3: extract value
  const curr = nameToValue(name);
  if (curr == null) {
    notFound.add(name);
    console.log("i18 - not found name", name);
    return "";
  }
  // step 4: transform value: prepare to format, format, process nl2br
  const formatted = format(
    curr.toString().replace(/%+n/g, (pattern) => pattern.replace(/%/g, "%%")),
    ...baseArgs
  );
  const lines: INL2BR = nl2br(formatted);
  if (lines === null) {
    notFound.add(name);
    console.log("i18 - not found name", name);
    return "";
  }
  // step 5: if value includes %n
  //   then process insert nodes
  //   else just use nl2br export as output
  let body;
  // if we need paste node
  if (formatted.replace(/%%/g, "").includes("%n")) {
    body = linesToBody(lines, nodeArgs);
  } else {
    // no nodes inside
    body = lines;
  }
  // step 6: if we can use cache store string to cache
  if (useCache && key) {
    cache.tn.set(key, body);
  }
  return body;
};

export const setLocale = (localeShort: Local) => {
  locale = localeShort;
};

export const getLocale = (): Local => locale;

export const listLocales = (): Local[] => [ "en", "de", "fr", "ru" ];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).getNotFoundLocalizeName = () => {
  return [ ...notFound.values() ];
};
