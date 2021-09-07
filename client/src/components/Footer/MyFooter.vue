<template>
  <footer class="footer">
    <div class="footer-top">
      <div>
        <!-- <section>
          <h5 class="footer-top-section-title">Contact</h5>
        </section> -->
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <div>
          <div>
            <div>
              <div>
                <p class="footer-bottom-text">
                  © {{ new Date().getFullYear() }} Some text
                  <!-- <a
                    href="https://qodeinteractive.com"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    >QODE INTERACTIVE</a
                  >, ALL RIGHTS RESERVED -->
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss">
.footer {
}
.footer-top {
  padding: 20px 4%;
  position: relative;
  background-color: #282828;
  border-top: 0 solid #e1e1e1;
  box-sizing: border-box;

  .footer-top-section-title {
    margin: 0;
    font-family: "Josefin Sans", sans-serif;
    color: #fff;
    font-weight: 500;
    letter-spacing: 0.01em;
    word-wrap: break-word;
  }
}

.footer-bottom {
  position: relative;
  display: inline-block;
  width: 100%;
  vertical-align: middle;
  background-color: #000;
  border-top: 0 solid #e1e1e1;
  box-sizing: border-box;
  text-align: center;

  .footer-bottom-inner {
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .footer-bottom-text {
    margin: 0;
    color: #fff;
    font-family: "Josefin Sans", sans-serif;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.35em;
  }
}
</style>
