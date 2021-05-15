`<script>
        const sendMemoryInfo = ({ source }) => {
            removeEventListener('message', sendMemoryInfo);
            source.postMessage("${data}", '*')
        };
        addEventListener('message', sendMemoryInfo);
        open('https://ureimu.github.io/manual-screeps/tools/mermaid.html', '_blank', 'fullscreen=no');

        setTimeout(function () {
            $(".console-controls .md-button:eq(1)").trigger('click');
        });
    <\/script>`.replace(/((\s\s)|\n)/g, "")
