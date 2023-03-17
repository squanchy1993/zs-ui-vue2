module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        // [0:disable/1:warning/2:error, always/nerver, rule]
        'type-enum': [2, 'always', [
            'build', 'ci', 'docs', 'feat', 'merge', 'fix', 'perf', 'refactor', 'style', 'test', 'revert', 'chore', 'rm'
        ]],
        'subject-full-stop': [0, 'never'],
        'subject-case': [0, 'never']
    }
}