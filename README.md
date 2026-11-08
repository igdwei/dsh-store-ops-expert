# Store Ops Expert · DSH plugin (Plan A)

Turns a POS export into conclusions a store manager can act on.

DSH port of the WorkBuddy expert `canyin-storeops-analyst`:

- **Two skills**: `store-ops-analyst` (judgement and boundaries) and `store-ops-workbench` (deliver and explain the dashboard);
- **One entry**: a 「经营看板」 button next to the composer opens the single-file dashboard;
- **Local data**: the dashboard is a zero-dependency HTML file; imported Excel never leaves the browser.

## Install

After the marketplace lists it, install from Settings → Plugin Market.

Local development install:

```bash
dsh plugin --profile <profile> add <absolute path to this directory>
```

## Use

1. Click 「经营看板」 next to the composer;
2. In the dashboard, go to 「数据」 → import your own POS export (xlsx / csv, multi-select);
3. Check the reconciliation panel first: three amount identities must have zero error;
4. Set a target on the 「经营」 page, then read gap, attribution and actions;
5. Ask the agent: "My revenue went up but my take-home dropped — where is the money leaking?"

## Boundaries

- No cost / labour / rent / utilities fields: no gross margin, net profit, labour or space efficiency;
- One month of data: no year-over-year;
- Only transacted customers: no footfall conversion;
- No invented numbers and no promised uplift.

## License

MIT.
