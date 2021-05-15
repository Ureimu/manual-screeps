`<script>
    const sendMemoryInfo = ({ source }) => {
        removeEventListener('message', sendMemoryInfo);
        source.postMessage(${JSON.stringify(Memory)}, '*')
    };
    addEventListener('message', sendMemoryInfo);
    open('https://screeps-cn.github.io/memory-analyzer/main.html', '_blank', 'fullscreen=no');

    setTimeout(function () {
    $(".console-controls .md-button:eq(1)").trigger('click');
    });
<\/script>`.replace(/\n/g, '')
