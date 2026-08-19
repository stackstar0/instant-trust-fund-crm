import { ISmsTemplate, IVariableTag } from "../models/SmsTemplate";

export interface ICompilationResult {
  compiledText: string;
  isValid: boolean;
  validationErrors: string[];
}

/**
 * Compiles DLT templates by replacing double-curly placeholders with dynamic variables
 * and validating variable tag constraints & whitelisted URLs according to TRAI guidelines.
 */
export const compileAndValidateSmsText = (
  template: Pick<ISmsTemplate, "bodyTemplate" | "variableTags" | "whitelistedUrls">,
  variableMap: Record<string, any>
): ICompilationResult => {
  let compiledText = template.bodyTemplate || "";
  const validationErrors: string[] = [];

  // 1. Replace placeholders
  for (const [key, rawValue] of Object.entries(variableMap)) {
    const valueStr = rawValue !== undefined && rawValue !== null ? String(rawValue) : "";
    const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    compiledText = compiledText.replace(placeholder, valueStr);
  }

  // Check for any unpopulated placeholders
  const remainingPlaceholders = compiledText.match(/{{\s*[\w_]+\s*}}/g);
  if (remainingPlaceholders && remainingPlaceholders.length > 0) {
    validationErrors.push(`Unpopulated placeholders remaining: ${remainingPlaceholders.join(", ")}`);
  }

  // 2. Validate variable tag constraints
  if (template.variableTags && template.variableTags.length > 0) {
    template.variableTags.forEach((tag: IVariableTag) => {
      const val = variableMap[tag.varName];
      if (val !== undefined && val !== null) {
        const valStr = String(val).trim();

        switch (tag.tagType) {
          case "#number#": {
            // Strip currency symbols and commas for checking if numeric digits exist
            const cleanVal = valStr.replace(/[^0-9.]/g, "");
            if (!cleanVal || isNaN(Number(cleanVal))) {
              validationErrors.push(`Variable '${tag.varName}' must be a valid number, received '${valStr}'.`);
            }
            break;
          }
          case "#url#": {
            try {
              new URL(valStr);
            } catch {
              validationErrors.push(`Variable '${tag.varName}' must be a valid URL, received '${valStr}'.`);
            }
            break;
          }
          case "#email#": {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(valStr)) {
              validationErrors.push(`Variable '${tag.varName}' must be a valid email, received '${valStr}'.`);
            }
            break;
          }
          case "#alphanumeric#": {
            // Must contain basic text/numbers without malicious script tags
            if (/<[^>]*>/g.test(valStr)) {
              validationErrors.push(`Variable '${tag.varName}' contains forbidden HTML/script tags.`);
            }
            break;
          }
        }
      }
    });
  }

  // 3. Validate embedded URLs against whitelisted URLs if specified
  if (template.whitelistedUrls && template.whitelistedUrls.length > 0) {
    const urlMatches = compiledText.match(/(https?:\/\/[^\s]+)/gi);
    if (urlMatches) {
      urlMatches.forEach((foundUrl) => {
        const isWhitelisted = template.whitelistedUrls!.some((allowedUrl) =>
          foundUrl.toLowerCase().startsWith(allowedUrl.toLowerCase())
        );
        if (!isWhitelisted) {
          validationErrors.push(`URL '${foundUrl}' is not in the approved DLT whitelist.`);
        }
      });
    }
  }

  return {
    compiledText,
    isValid: validationErrors.length === 0,
    validationErrors,
  };
};
