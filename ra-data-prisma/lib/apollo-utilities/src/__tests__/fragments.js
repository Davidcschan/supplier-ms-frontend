var printer_1 = require('graphql/language/printer');
var graphql_tag_1 = require('graphql-tag');
var graphql_tag_2 = require('graphql-tag');
// Turn off warnings for repeated fragment names
graphql_tag_2.disableFragmentWarnings();
var fragments_1 = require('../fragments');
describe('getFragmentQueryDocument', function () {
    it('will throw an error if there is an operation', function () {
        expect(function () {
            return fragments_1.getFragmentQueryDocument((_a = ["\n          {\n            a\n            b\n            c\n          }\n        "], _a.raw = ["\n          {\n            a\n            b\n            c\n          }\n        "], graphql_tag_1.default(_a)));
            var _a;
        }).toThrowError('Found a query operation. No operations are allowed when using a fragment as a query. Only fragments are allowed.');
        expect(function () {
            return fragments_1.getFragmentQueryDocument((_a = ["\n          query {\n            a\n            b\n            c\n          }\n        "], _a.raw = ["\n          query {\n            a\n            b\n            c\n          }\n        "], graphql_tag_1.default(_a)));
            var _a;
        }).toThrowError('Found a query operation. No operations are allowed when using a fragment as a query. Only fragments are allowed.');
        expect(function () {
            return fragments_1.getFragmentQueryDocument((_a = ["\n          query Named {\n            a\n            b\n            c\n          }\n        "], _a.raw = ["\n          query Named {\n            a\n            b\n            c\n          }\n        "], graphql_tag_1.default(_a)));
            var _a;
        }).toThrowError("Found a query operation named 'Named'. No operations are allowed when using a fragment as a query. Only fragments are allowed.");
        expect(function () {
            return fragments_1.getFragmentQueryDocument((_a = ["\n          mutation Named {\n            a\n            b\n            c\n          }\n        "], _a.raw = ["\n          mutation Named {\n            a\n            b\n            c\n          }\n        "], graphql_tag_1.default(_a)));
            var _a;
        }).toThrowError("Found a mutation operation named 'Named'. No operations are allowed when using a fragment as a query. " +
            'Only fragments are allowed.');
        expect(function () {
            return fragments_1.getFragmentQueryDocument((_a = ["\n          subscription Named {\n            a\n            b\n            c\n          }\n        "], _a.raw = ["\n          subscription Named {\n            a\n            b\n            c\n          }\n        "], graphql_tag_1.default(_a)));
            var _a;
        }).toThrowError("Found a subscription operation named 'Named'. No operations are allowed when using a fragment as a query. " +
            'Only fragments are allowed.');
    });
    it('will throw an error if there is not exactly one fragment but no `fragmentName`', function () {
        expect(function () {
            fragments_1.getFragmentQueryDocument((_a = ["\n        fragment foo on Foo {\n          a\n          b\n          c\n        }\n\n        fragment bar on Bar {\n          d\n          e\n          f\n        }\n      "], _a.raw = ["\n        fragment foo on Foo {\n          a\n          b\n          c\n        }\n\n        fragment bar on Bar {\n          d\n          e\n          f\n        }\n      "], graphql_tag_1.default(_a)));
            var _a;
        }).toThrowError('Found 2 fragments. `fragmentName` must be provided when there is not exactly 1 fragment.');
        expect(function () {
            fragments_1.getFragmentQueryDocument((_a = ["\n        fragment foo on Foo {\n          a\n          b\n          c\n        }\n\n        fragment bar on Bar {\n          d\n          e\n          f\n        }\n\n        fragment baz on Baz {\n          g\n          h\n          i\n        }\n      "], _a.raw = ["\n        fragment foo on Foo {\n          a\n          b\n          c\n        }\n\n        fragment bar on Bar {\n          d\n          e\n          f\n        }\n\n        fragment baz on Baz {\n          g\n          h\n          i\n        }\n      "], graphql_tag_1.default(_a)));
            var _a;
        }).toThrowError('Found 3 fragments. `fragmentName` must be provided when there is not exactly 1 fragment.');
        expect(function () {
            fragments_1.getFragmentQueryDocument((_a = ["\n        scalar Foo\n      "], _a.raw = ["\n        scalar Foo\n      "], graphql_tag_1.default(_a)));
            var _a;
        }).toThrowError('Found 0 fragments. `fragmentName` must be provided when there is not exactly 1 fragment.');
    });
    it('will create a query document where the single fragment is spread in the root query', function () {
        expect(printer_1.print(fragments_1.getFragmentQueryDocument((_a = ["\n          fragment foo on Foo {\n            a\n            b\n            c\n          }\n        "], _a.raw = ["\n          fragment foo on Foo {\n            a\n            b\n            c\n          }\n        "], graphql_tag_1.default(_a))))).toEqual(printer_1.print((_b = ["\n        {\n          ...foo\n        }\n\n        fragment foo on Foo {\n          a\n          b\n          c\n        }\n      "], _b.raw = ["\n        {\n          ...foo\n        }\n\n        fragment foo on Foo {\n          a\n          b\n          c\n        }\n      "], graphql_tag_1.default(_b))));
        var _a, _b;
    });
    it('will create a query document where the named fragment is spread in the root query', function () {
        expect(printer_1.print(fragments_1.getFragmentQueryDocument((_a = ["\n            fragment foo on Foo {\n              a\n              b\n              c\n            }\n\n            fragment bar on Bar {\n              d\n              e\n              f\n              ...foo\n            }\n\n            fragment baz on Baz {\n              g\n              h\n              i\n              ...foo\n              ...bar\n            }\n          "], _a.raw = ["\n            fragment foo on Foo {\n              a\n              b\n              c\n            }\n\n            fragment bar on Bar {\n              d\n              e\n              f\n              ...foo\n            }\n\n            fragment baz on Baz {\n              g\n              h\n              i\n              ...foo\n              ...bar\n            }\n          "], graphql_tag_1.default(_a)), 'foo'))).toEqual(printer_1.print((_b = ["\n        {\n          ...foo\n        }\n\n        fragment foo on Foo {\n          a\n          b\n          c\n        }\n\n        fragment bar on Bar {\n          d\n          e\n          f\n          ...foo\n        }\n\n        fragment baz on Baz {\n          g\n          h\n          i\n          ...foo\n          ...bar\n        }\n      "], _b.raw = ["\n        {\n          ...foo\n        }\n\n        fragment foo on Foo {\n          a\n          b\n          c\n        }\n\n        fragment bar on Bar {\n          d\n          e\n          f\n          ...foo\n        }\n\n        fragment baz on Baz {\n          g\n          h\n          i\n          ...foo\n          ...bar\n        }\n      "], graphql_tag_1.default(_b))));
        expect(printer_1.print(fragments_1.getFragmentQueryDocument((_c = ["\n            fragment foo on Foo {\n              a\n              b\n              c\n            }\n\n            fragment bar on Bar {\n              d\n              e\n              f\n              ...foo\n            }\n\n            fragment baz on Baz {\n              g\n              h\n              i\n              ...foo\n              ...bar\n            }\n          "], _c.raw = ["\n            fragment foo on Foo {\n              a\n              b\n              c\n            }\n\n            fragment bar on Bar {\n              d\n              e\n              f\n              ...foo\n            }\n\n            fragment baz on Baz {\n              g\n              h\n              i\n              ...foo\n              ...bar\n            }\n          "], graphql_tag_1.default(_c)), 'bar'))).toEqual(printer_1.print((_d = ["\n        {\n          ...bar\n        }\n\n        fragment foo on Foo {\n          a\n          b\n          c\n        }\n\n        fragment bar on Bar {\n          d\n          e\n          f\n          ...foo\n        }\n\n        fragment baz on Baz {\n          g\n          h\n          i\n          ...foo\n          ...bar\n        }\n      "], _d.raw = ["\n        {\n          ...bar\n        }\n\n        fragment foo on Foo {\n          a\n          b\n          c\n        }\n\n        fragment bar on Bar {\n          d\n          e\n          f\n          ...foo\n        }\n\n        fragment baz on Baz {\n          g\n          h\n          i\n          ...foo\n          ...bar\n        }\n      "], graphql_tag_1.default(_d))));
        expect(printer_1.print(fragments_1.getFragmentQueryDocument((_e = ["\n            fragment foo on Foo {\n              a\n              b\n              c\n            }\n\n            fragment bar on Bar {\n              d\n              e\n              f\n              ...foo\n            }\n\n            fragment baz on Baz {\n              g\n              h\n              i\n              ...foo\n              ...bar\n            }\n          "], _e.raw = ["\n            fragment foo on Foo {\n              a\n              b\n              c\n            }\n\n            fragment bar on Bar {\n              d\n              e\n              f\n              ...foo\n            }\n\n            fragment baz on Baz {\n              g\n              h\n              i\n              ...foo\n              ...bar\n            }\n          "], graphql_tag_1.default(_e)), 'baz'))).toEqual(printer_1.print((_f = ["\n        {\n          ...baz\n        }\n\n        fragment foo on Foo {\n          a\n          b\n          c\n        }\n\n        fragment bar on Bar {\n          d\n          e\n          f\n          ...foo\n        }\n\n        fragment baz on Baz {\n          g\n          h\n          i\n          ...foo\n          ...bar\n        }\n      "], _f.raw = ["\n        {\n          ...baz\n        }\n\n        fragment foo on Foo {\n          a\n          b\n          c\n        }\n\n        fragment bar on Bar {\n          d\n          e\n          f\n          ...foo\n        }\n\n        fragment baz on Baz {\n          g\n          h\n          i\n          ...foo\n          ...bar\n        }\n      "], graphql_tag_1.default(_f))));
        var _a, _b, _c, _d, _e, _f;
    });
});
